'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import {
  FileText,
  Printer,
  Copy,
  CheckCircle2,
  Download,
  Eye,
  Sparkles,
} from 'lucide-react'

interface DocumentTemplate {
  id: string
  name: string
  category: 'Recruitment' | 'Employment' | 'Separation' | 'Compliance'
  description: string
  variables: string[]
  sampleText: string
}

const templates: DocumentTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Formal Employment Offer Letter',
    category: 'Recruitment',
    description: 'Issued to selected candidates outlining designation, CTC compensation, and joining date.',
    variables: ['{{candidate_name}}', '{{designation}}', '{{joining_date}}', '{{ctc}}', '{{reporting_manager}}'],
    sampleText: `Dear {{candidate_name}},

We are delighted to extend an offer of employment with PeopleCore Technologies Inc. as {{designation}}.

1. Date of Joining: {{joining_date}}
2. Annual Cost to Company (CTC): {{ctc}} per annum
3. Reporting Hierarchy: You will report directly to {{reporting_manager}}
4. Probation Period: 3 months from the date of joining

Please review the attached terms and sign this agreement within 3 business days.

Warm regards,
People Operations Team`,
  },
  {
    id: 'tpl-2',
    name: 'Official Relieving & Experience Certificate',
    category: 'Separation',
    description: 'Formal discharge letter confirming tenure, designation, and successful clearance.',
    variables: ['{{employee_name}}', '{{employee_id}}', '{{designation}}', '{{joining_date}}', '{{relieving_date}}'],
    sampleText: `TO WHOMSOEVER IT MAY CONCERN

This is to certify that {{employee_name}} (Employee ID: {{employee_id}}) was employed with PeopleCore Technologies Inc. from {{joining_date}} to {{relieving_date}}.

During this tenure, they served with distinction as {{designation}}.

All company assets, clearances, and financial accounts have been satisfactorily settled. We appreciate their contributions and wish them every success in future endeavors.

Authorized Signatory,
Head of Human Resources`,
  },
  {
    id: 'tpl-3',
    name: 'Salary & Employment Verification Certificate',
    category: 'Employment',
    description: 'Requested by employees for visa applications, home loans, and bank verifications.',
    variables: ['{{employee_name}}', '{{designation}}', '{{joining_date}}', '{{monthly_gross}}'],
    sampleText: `EMPLOYMENT & COMPENSATION CERTIFICATE

This is to confirm that {{employee_name}} is a full-time, permanent employee of PeopleCore Technologies Inc. currently working as {{designation}} since {{joining_date}}.

Their current gross monthly compensation is {{monthly_gross}}.

This letter is issued upon the employee's request for verification purposes.

People Operations & Payroll Dept.`,
  },
]

export function TemplatesClient() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<DocumentTemplate>(templates[0])
  const [previewName, setPreviewName] = React.useState('Priya Sharma')
  const [previewDesignation, setPreviewDesignation] = React.useState('Senior Frontend Engineer')
  const [previewCTC, setPreviewCTC] = React.useState('₹24,00,000')
  const [copied, setCopied] = React.useState(false)

  const getRenderedContent = () => {
    return selectedTemplate.sampleText
      .replace(/{{candidate_name}}|{{employee_name}}/g, previewName)
      .replace(/{{designation}}/g, previewDesignation)
      .replace(/{{ctc}}/g, previewCTC)
      .replace(/{{joining_date}}/g, '15 November 2026')
      .replace(/{{relieving_date}}/g, '10 November 2026')
      .replace(/{{reporting_manager}}/g, 'Rajesh Kumar')
      .replace(/{{employee_id}}/g, 'PC-1002')
      .replace(/{{monthly_gross}}/g, '₹2,00,000')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getRenderedContent())
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Template picker list and live preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Template Catalog */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">
            Available Templates ({templates.length})
          </h3>
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl)}
              className={`p-3.5 rounded-[8px] border cursor-pointer transition-all ${
                selectedTemplate.id === tpl.id
                  ? 'border-[#5e2b9d] bg-purple-50/40 shadow-xs'
                  : 'border-[#e5e7eb] bg-white hover:border-[#d1d5db]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-[#111827]">{tpl.name}</span>
                <span className="text-[10px] text-[#5e2b9d] bg-purple-50 px-1.5 py-0.5 rounded font-medium">
                  {tpl.category}
                </span>
              </div>
              <p className="text-[11px] text-[#6b7280] leading-snug">{tpl.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {tpl.variables.slice(0, 3).map((v) => (
                  <span
                    key={v}
                    className="text-[10px] font-mono bg-white border border-[#e5e7eb] px-1.5 py-0.2 rounded text-[#4b5563]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Live Merge Preview */}
        <div className="lg:col-span-2 space-y-4">
          {/* Merge variable controls */}
          <div className="p-3 bg-white border border-[#e5e7eb] rounded-[8px] flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[140px] space-y-1">
              <label className="text-[11px] font-semibold text-[#6b7280]">Target Employee</label>
              <input
                type="text"
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
                className="w-full text-xs h-7 border border-[#e5e7eb] rounded px-2"
              />
            </div>
            <div className="flex-1 min-w-[140px] space-y-1">
              <label className="text-[11px] font-semibold text-[#6b7280]">Designation</label>
              <input
                type="text"
                value={previewDesignation}
                onChange={(e) => setPreviewDesignation(e.target.value)}
                className="w-full text-xs h-7 border border-[#e5e7eb] rounded px-2"
              />
            </div>
            <div className="flex-1 min-w-[120px] space-y-1">
              <label className="text-[11px] font-semibold text-[#6b7280]">Annual CTC</label>
              <input
                type="text"
                value={previewCTC}
                onChange={(e) => setPreviewCTC(e.target.value)}
                className="w-full text-xs h-7 border border-[#e5e7eb] rounded px-2"
              />
            </div>
            <div className="flex items-end gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-7 text-xs gap-1"
              >
                {copied ? <CheckCircle2 className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy Text'}
              </Button>
              <Button
                size="sm"
                onClick={handlePrint}
                className="h-7 text-xs gap-1 bg-[#5e2b9d] hover:bg-[#4d2382] text-white"
              >
                <Printer className="h-3 w-3" /> Print / Export PDF
              </Button>
            </div>
          </div>

          {/* Letterhead Preview Sheet */}
          <Card className="p-8 bg-white border border-[#e5e7eb] shadow-sm font-serif min-h-[460px] text-sm text-[#1f2937] leading-relaxed">
            {/* Header Letterhead */}
            <div className="border-b-2 border-[#5e2b9d] pb-4 mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold font-sans text-[#111827] tracking-tight">
                  PEOPLECORE TECHNOLOGIES INC.
                </h2>
                <p className="text-xs font-sans text-[#6b7280] mt-0.5">
                  Prestige Tech Cloud, North Tower, Bangalore 560048 • hr@peoplecore.io
                </p>
              </div>
              <span className="text-xs font-sans font-mono text-[#9ca3af]">
                REF: DOC/2026/0491
              </span>
            </div>

            <div className="whitespace-pre-line text-xs font-sans leading-relaxed text-[#374151]">
              {getRenderedContent()}
            </div>

            <div className="mt-12 pt-6 border-t border-[#e5e7eb] flex items-center justify-between text-xs font-sans text-[#6b7280]">
              <div>
                <p className="font-semibold text-[#111827]">Authorized Signatory</p>
                <p>People Operations Department</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#9ca3af] block">Digitally verified and sealed</span>
                <span className="font-mono text-[10px] text-[#5e2b9d]">SHA256: 7f8a9b2c...3d</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

