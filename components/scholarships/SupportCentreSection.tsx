'use client';

import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  LifeBuoy,
  MessageSquare,
  Phone,
  Plus,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { ScholarshipProgram } from '@/lib/scholarships-data';

export interface SupportTicket {
  id: string;
  category: string;
  subject: string;
  description: string;
  status: 'Open' | 'In Review' | 'Answered' | 'Resolved' | 'Closed';
  admin_response?: string | null;
  created_at: string;
  scholarship_id?: string | null;
}

interface SupportCentreSectionProps {
  programs: ScholarshipProgram[];
  tickets: SupportTicket[];
  onSubmitTicket: (ticket: {
    category: string;
    subject: string;
    description: string;
    scholarshipId?: string;
  }) => Promise<void>;
}

export function SupportCentreSection({
  programs,
  tickets,
  onSubmitTicket,
}: SupportCentreSectionProps) {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [category, setCategory] = useState('Eligibility Doubts');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [scholarshipId, setScholarshipId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    setSubmitting(true);
    setMessage(null);
    try {
      await onSubmitTicket({ category, subject, description, scholarshipId: scholarshipId || undefined });
      setSubmitting(false);
      setMessage('Your question has been logged successfully.');
      setShowTicketForm(false);
      setSubject('');
      setDescription('');
      setScholarshipId('');
    } catch {
      setSubmitting(false);
      setMessage('Failed to submit question. Ensure you are signed in.');
    }
  };

  const officialHelplines = [
    { title: 'National Scholarship Portal (NSP) Helpdesk', phone: '0120 - 6619540', email: 'helpdesk@nsp.gov.in', timing: '24x7 Support' },
    { title: 'TN BC / MBC / Minorities Welfare Directorate', phone: '044 - 28551413', email: 'bcmbcw@tn.gov.in', timing: '10:00 AM - 5:45 PM (Working Days)' },
    { title: 'TN Adi Dravidar Welfare Scholarship Wing', phone: '044 - 28594780', email: 'adw@tn.gov.in', timing: '10:00 AM - 5:45 PM (Working Days)' },
    { title: 'AICTE Student Scheme Cell (Pragati/Saksham)', phone: '011 - 29581000', email: 'pragatisaksham@aicte-india.org', timing: '9:30 AM - 5:30 PM (Working Days)' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-7 shadow-xs">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] mb-2">
            <LifeBuoy size={15} /> STUDENT GUIDANCE & COMPLAINTS
          </div>
          <h2 className="font-serif text-[24px] font-bold text-[#2b2118]">
            Scholarship Support Centre
          </h2>
          <p className="mt-1 font-sans text-[14px] text-[#7a6a5a]">
            Get expert guidance on eligibility ambiguities, portal submission glitches, DBT payments, and renewals.
          </p>
        </div>

        <button
          onClick={() => setShowTicketForm(!showTicketForm)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#8c2f39] px-4 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-[#6d1824] shadow-xs"
        >
          <Plus size={16} />
          <span>{showTicketForm ? 'Cancel' : 'Submit Support Query'}</span>
        </button>
      </div>

      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-sans text-[13px] text-emerald-900 font-medium">
          {message}
        </div>
      )}

      {/* Ticket Submission Form */}
      {showTicketForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-sm space-y-4"
        >
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
            Submit a Scholarship Support Query
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Query Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                <option value="Eligibility Doubts">Eligibility Doubts</option>
                <option value="Application Portal Problems">Application Portal Problems (NSP / UMIS / State)</option>
                <option value="Document-Related Questions">Document-Related Questions (Income/Bonafide)</option>
                <option value="Payment & DBT Related Questions">Payment & DBT Related Questions (NPCI / PFMS)</option>
                <option value="Renewal Questions">Renewal Questions</option>
                <option value="Other Questions">Other Questions</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Related Scholarship Scheme (Optional)
              </label>
              <select
                value={scholarshipId}
                onChange={(e) => setScholarshipId(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                <option value="">Select scheme (optional)</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
              Subject Summary *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Income certificate showing gross vs net salary for BC Post-Matric"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
              Detailed Description of your Query *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe what occurred, any error messages shown on the government portal, or specific clause you need clarification on."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowTicketForm(false)}
              className="rounded-lg border border-[#d8c7ad] px-4 py-2 font-sans text-[13px] font-semibold text-[#7a6a5a] hover:bg-[#f6ede0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#8c2f39] px-5 py-2 font-sans text-[13px] font-bold text-white hover:bg-[#6d1824]"
            >
              <Send size={14} />
              <span>{submitting ? 'Submitting...' : 'Submit Query'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Student's Existing Tickets */}
      <div className="space-y-4">
        <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
          Your Submitted Support Queries ({tickets.length})
        </h3>

        {tickets.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#d8c7ad] bg-[#fdfbf6] p-8 text-center text-[#7a6a5a] text-sm">
            <MessageSquare size={28} className="mx-auto text-[#a08f7e] mb-2" />
            <p>You haven't submitted any support tickets yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-xl border border-[#efe3cc] bg-white p-5 space-y-2 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#8c2f39]">
                    {ticket.category}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-sans text-[11px] font-bold ${
                      ticket.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ticket.status === 'Answered'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <h4 className="font-serif text-[16px] font-bold text-[#2b2118]">
                  {ticket.subject}
                </h4>
                <p className="font-sans text-[13px] text-[#554a3f] whitespace-pre-wrap">
                  {ticket.description}
                </p>

                {ticket.admin_response && (
                  <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3.5 text-[13px] text-emerald-950">
                    <strong className="block font-semibold text-emerald-900 mb-1">
                      Support Team Response:
                    </strong>
                    <p className="whitespace-pre-wrap">{ticket.admin_response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Government Helplines */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-7 shadow-xs space-y-4">
        <h3 className="font-serif text-[20px] font-bold text-[#2b2118] flex items-center gap-2">
          <Phone size={18} className="text-[#8c2f39]" />
          Official Government Department Helplines
        </h3>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          For urgent technical portal errors, grievance escalations, and official verification delays.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {officialHelplines.map((line, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#efe3cc] bg-white p-4 space-y-1 text-[13px]"
            >
              <h4 className="font-serif font-bold text-[#2b2118]">{line.title}</h4>
              <p className="text-[#554a3f]">
                <strong>Helpline:</strong> <span className="font-mono text-[#8c2f39]">{line.phone}</span>
              </p>
              <p className="text-[#554a3f]">
                <strong>Official Email:</strong> {line.email}
              </p>
              <p className="text-[11px] text-[#7a6a5a]">Hours: {line.timing}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
