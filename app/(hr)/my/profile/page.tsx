import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/common/Avatar'
import { Button } from '@/components/ui/button'
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  CreditCard,
  ShieldCheck,
  User,
  Briefcase,
  Download,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Profile' }

export default async function MyProfilePage() {
  const profile = {
    name: 'Priya Sharma',
    empId: 'PC-1002',
    designation: 'Senior Frontend Engineer',
    department: 'Engineering',
    reportingManager: 'Rajesh Kumar (VP Engineering)',
    workEmail: 'priya.sharma@peoplecore.io',
    phone: '+91 98765 43210',
    joiningDate: '15 March 2023',
    location: 'Bangalore Tech Cloud (North Tower)',
    employmentType: 'Full-Time Permanent',
    pan: 'ABCPS1234F',
    aadhaar: 'XXXX-XXXX-8821',
    uan: '101239845129',
    bankName: 'HDFC Bank Ltd.',
    bankAccount: '•••••••• 4892',
    ifsc: 'HDFC0001234',
    bloodGroup: 'B+',
    emergencyContact: 'Ramesh Sharma (Father) • +91 98765 11111',
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Employee Profile"
        description="View your personal information, employment records, statutory credentials, and emergency details."
        breadcrumb={[
          { label: 'Employee Portal', href: '/my/dashboard' },
          { label: 'My Profile' },
        ]}
      />

      {/* Top Profile Summary Card */}
      <Card className="p-6 bg-white border border-[#e5e7eb]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={profile.name} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#111827]">{profile.name}</h2>
                <span className="text-xs font-mono font-semibold text-[#5e2b9d] bg-purple-50 px-2 py-0.5 rounded">
                  {profile.empId}
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
              <p className="text-sm font-medium text-[#4b5563] mt-0.5">{profile.designation}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b7280] mt-2">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-[#9ca3af]" />
                  {profile.department}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#9ca3af]" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#9ca3af]" />
                  Joined {profile.joiningDate}
                </span>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <Download className="h-3.5 w-3.5" /> Download ID Card
          </Button>
        </div>
      </Card>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employment & Manager Info */}
        <Card className="p-5 bg-white border border-[#e5e7eb] space-y-3">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <Briefcase className="h-3.5 w-3.5 text-[#5e2b9d]" /> Employment Details
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#9ca3af] block">Employment Type</span>
              <span className="font-semibold text-[#111827]">{profile.employmentType}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">Reporting Manager</span>
              <span className="font-semibold text-[#111827]">{profile.reportingManager}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">Work Email</span>
              <span className="font-semibold text-[#111827]">{profile.workEmail}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">Mobile Phone</span>
              <span className="font-semibold text-[#111827]">{profile.phone}</span>
            </div>
          </div>
        </Card>

        {/* Statutory & Identity */}
        <Card className="p-5 bg-white border border-[#e5e7eb] space-y-3">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-[#5e2b9d]" /> Statutory Compliance
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#9ca3af] block">Permanent Account No (PAN)</span>
              <span className="font-mono font-semibold text-[#111827]">{profile.pan}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">Aadhaar (Masked)</span>
              <span className="font-mono font-semibold text-[#111827]">{profile.aadhaar}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">Universal Account No (UAN)</span>
              <span className="font-mono font-semibold text-[#111827]">{profile.uan}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">Blood Group</span>
              <span className="font-semibold text-[#111827]">{profile.bloodGroup}</span>
            </div>
          </div>
        </Card>

        {/* Banking Details */}
        <Card className="p-5 bg-white border border-[#e5e7eb] space-y-3">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <CreditCard className="h-3.5 w-3.5 text-[#5e2b9d]" /> Salary Bank Account
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#9ca3af] block">Bank Name</span>
              <span className="font-semibold text-[#111827]">{profile.bankName}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">Account Number</span>
              <span className="font-mono font-semibold text-[#111827]">{profile.bankAccount}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">IFSC Code</span>
              <span className="font-mono font-semibold text-[#111827]">{profile.ifsc}</span>
            </div>
            <div>
              <span className="text-[#9ca3af] block">Disbursement Mode</span>
              <span className="font-semibold text-emerald-700">Direct Bank Transfer (NEFT/RTGS)</span>
            </div>
          </div>
        </Card>

        {/* Emergency Contacts */}
        <Card className="p-5 bg-white border border-[#e5e7eb] space-y-3">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <User className="h-3.5 w-3.5 text-[#5e2b9d]" /> Emergency Contact
          </h3>
          <div className="text-xs space-y-1">
            <span className="text-[#9ca3af] block">Primary Contact Person</span>
            <span className="font-semibold text-[#111827] text-sm">{profile.emergencyContact}</span>
            <p className="text-[11px] text-[#6b7280] pt-1">
              Contact HR Operations if you need to update legal nominee or emergency records.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

