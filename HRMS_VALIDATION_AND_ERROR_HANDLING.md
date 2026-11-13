# HRMS Data Validation, Regex Standards & Error Handling Architecture

**Document Reference:** HRMS-VAL-ERR-2026  
**System Name:** PeopleCore Multi-Tenant HRMS SaaS  
**Validation Layer:** Dual-Tier (Client-side React Hook Form + Zod & Server-side Server Action / Route Handler Zod Schemas).

---

## 1. Statutory & Personal Identity Regex Standards

| Entity / Field | Regular Expression Pattern | Validation Rules & Constraints | Example Valid Input |
|---|---|---|---|
| **Permanent Account Number (PAN)** | `^[A-Z]{5}[0-9]{4}[A-Z]{1}$` | 10 chars: 5 uppercase letters, 4 digits, 1 uppercase letter. 4th char denotes taxpayer status (P = Person, C = Company). | `ABCDE1234F` |
| **Aadhaar Number** | `^[2-9]{1}[0-9]{11}$` | 12 digits. Cannot start with 0 or 1. Must satisfy Verhoeff checksum algorithm. | `548912349012` |
| **IFSC Code** | `^[A-Z]{4}0[A-Z0-9]{6}$` | 11 chars: First 4 bank alphabetic code, 5th character strictly `0`, last 6 branch code. | `HDFC0001234` |
| **Universal Account Number (UAN)** | `^1[0-9]{11}$` | 12-digit numeric code assigned by EPFO. Starts with 1. | `101234567890` |
| **ESIC Employer Code** | `^[0-9]{17}$` | 17-digit numeric code issued by ESIC. | `11000123450001001` |
| **ESIC IP Number** | `^[0-9]{10}$` | 10-digit insurance number for insured worker. | `3112345678` |
| **GSTIN Number** | `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` | 15 alphanumeric chars. First 2 state code, next 10 PAN, 13th entity code, 14th 'Z', 15th checksum. | `27ABCDE1234F1Z5` |
| **Indian Mobile Number** | `^[6-9][0-9]{9}$` | 10 digits starting with 6, 7, 8, or 9. | `9876543210` |
| **Indian Postal PIN Code** | `^[1-9][0-9]{5}$` | 6 digits. Cannot start with 0. | `560001` |
| **Employee ID** | `^[A-Z0-9_-]{3,20}$` | 3 to 20 uppercase alphanumeric characters, dashes, or underscores. | `PC-2026-0042` |

---

## 2. Shared Zod Validation Schemas (Implementation-Ready TypeScript)

```typescript
import { z } from 'zod'

// 1. Tenant Signup & Onboarding Gate Schema
export const tenantSignupSchema = z.object({
  organization_name: z
    .string()
    .min(3, 'Organization name must be at least 3 characters')
    .max(100, 'Organization name cannot exceed 100 characters'),
  admin_name: z
    .string()
    .min(2, 'Administrator full name is required')
    .max(80),
  email: z
    .string()
    .email('Please enter a valid business email address')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one numeric digit')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  mobile_number: z
    .string()
    .regex(/^[6-9][0-9]{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  city: z
    .string()
    .min(2, 'City is required')
    .max(50),
  address: z
    .string()
    .min(5, 'Physical address must be at least 5 characters')
    .max(255),
  employee_count_estimate: z
    .number()
    .int()
    .positive()
    .default(10),
})

// 2. Add Employee Form Master Schema
export const addEmployeeSchema = z.object({
  employee_id: z.string().regex(/^[A-Z0-9_-]{3,20}$/, 'Invalid Employee ID format'),
  first_name: z.string().min(2, 'First name is required').max(50),
  last_name: z.string().min(1, 'Last name is required').max(50),
  date_of_birth: z.string().refine((dob) => {
    const age = Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    return age >= 18
  }, 'Employee must be at least 18 years of age'),
  work_email: z.string().email('Invalid work email'),
  mobile: z.string().regex(/^[6-9][0-9]{9}$/, 'Invalid mobile number'),
  joining_date: z.string().nonempty('Joining date is required'),
  branch_id: z.string().uuid('Please select a valid branch'),
  department_id: z.string().uuid('Please select a valid department'),
  designation_id: z.string().uuid('Please select a valid designation'),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  aadhaar: z.string().regex(/^[2-9]{1}[0-9]{11}$/, 'Invalid 12-digit Aadhaar number'),
  bank_name: z.string().min(2, 'Bank name is required'),
  account_number: z.string().regex(/^[0-9]{9,18}$/, 'Bank account must be 9 to 18 digits'),
  ifsc_code: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
  tax_regime: z.enum(['new', 'old']),
})
```

---

## 3. Concurrency & Optimistic Locking Strategy

To prevent race conditions during simultaneous approvals or payroll calculations:
1. Critical tables (`leave_balances`, `payroll_runs`, `approval_requests`, `employees`) maintain a `version INTEGER NOT NULL DEFAULT 1` or `updated_at TIMESTAMPTZ` column.
2. Updates execute with optimistic locking checks:
   ```sql
   UPDATE leave_balances 
   SET used = used + :days, pending = pending - :days, version = version + 1
   WHERE id = :balance_id AND version = :expected_version;
   ```
3. If row count returned is `0`: Server action throws `409 Conflict`: *"Record has been modified by another administrator. Please refresh the page and retry."*

---

## 4. Standard System Error Codes & JSON Response Structure

```json
{
  "success": false,
  "error": {
    "code": "TENANT_ACCOUNT_INACTIVE_OR_EXPIRED",
    "message": "Your organization account is currently inactive or your subscription period has expired.",
    "details": {
      "tenant_status": "inactive",
      "expiry_date": "2026-11-12",
      "target_redirect": "/onboarding/activation-pending"
    },
    "timestamp": "2026-11-13T10:30:00Z"
  }
}
```

### Common Error Code Reference:
- `AUTH_UNAUTHORIZED (401)`: Missing or invalid session cookie.
- `AUTH_FORBIDDEN (403)`: User role lacks permission to access target entity.
- `TENANT_EXPIRED (403)`: Tenant subscription expired; gated to pending screen.
- `RECORD_NOT_FOUND (404)`: Entity does not exist or belongs to another tenant.
- `RECORD_DUPLICATE (409)`: Unique constraint violation (e.g., Duplicate PAN, Duplicate Employee ID).
- `BUSINESS_RULE_VIOLATION (422)`: Invalid payroll calculation or insufficient leave balance.
- `DATABASE_UNAVAILABLE (503)`: Neon pooler timeout or connection exhaustion.

