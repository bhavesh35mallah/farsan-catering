import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  Search,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit2,
  X,
} from 'lucide-react';
import { cateringService } from '../../services/cateringService';

const AdminCateringPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const statuses = ['New', 'Contacted', 'Quotation Sent', 'Confirmed', 'Declined'];

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const data = await cateringService.getEnquiriesAdmin({
        search: search.trim(),
        status: statusFilter,
      });
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error('Error fetching catering enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter]);

  const handleOpenModal = (enq) => {
    setSelectedEnquiry(enq);
    setInternalNotes(enq.internalNotes || '');
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await cateringService.updateEnquiryStatus(selectedEnquiry._id, {
        enquiryStatus: newStatus,
        internalNotes,
      });
      if (res.success && res.enquiry) {
        setSelectedEnquiry(res.enquiry);
        setEnquiries((prev) =>
          prev.map((e) => (e._id === res.enquiry._id ? res.enquiry : e))
        );
      }
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await cateringService.updateEnquiryStatus(selectedEnquiry._id, {
        internalNotes,
      });
      if (res.success && res.enquiry) {
        setSelectedEnquiry(res.enquiry);
        setEnquiries((prev) =>
          prev.map((e) => (e._id === res.enquiry._id ? res.enquiry : e))
        );
        alert('Notes saved successfully.');
      }
    } catch (err) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Quotation Sent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Declined':
        return 'bg-stone-200 text-stone-700 border-stone-300';
      default:
        return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
          Catering &amp; Party Enquiries
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Review bulk requests, custom Gujarati menus, event dates, and client follow-ups.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client, event, phone..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 font-bold shrink-0">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none"
          >
            <option value="all">All Enquiries</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-saffron-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No catering enquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Client</th>
                  <th className="p-3.5">Event Type</th>
                  <th className="p-3.5">Event Date</th>
                  <th className="p-3.5">Guests</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-stone-50/60 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-stone-900">{enq.customer.name}</div>
                      <div className="text-[11px] text-stone-400">{enq.customer.phone}</div>
                    </td>
                    <td className="p-3.5 font-medium text-stone-800">
                      {enq.eventType}
                    </td>
                    <td className="p-3.5 font-semibold text-saffron-700">
                      {enq.eventDate}
                    </td>
                    <td className="p-3.5 font-bold text-stone-900">
                      {enq.guestCount} guests
                    </td>
                    <td className="p-3.5 text-stone-600 truncate max-w-[150px]">
                      {enq.eventLocation}
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(enq.enquiryStatus)}`}>
                        {enq.enquiryStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleOpenModal(enq)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-kothmir-50 hover:text-kothmir-700 text-stone-800 rounded-lg text-xs font-bold transition border border-stone-200"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto animate-fade-in space-y-6">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-kothmir-700 bg-kothmir-50 px-2 py-0.5 rounded-full">
                  Catering Request
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {selectedEnquiry.eventType} ({selectedEnquiry.guestCount} Guests)
                </h2>
                <p className="text-xs text-stone-400">
                  Received on: {new Date(selectedEnquiry.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="p-1 text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status change */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-700 block">Enquiry Status:</span>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(selectedEnquiry.enquiryStatus)}`}>
                  {selectedEnquiry.enquiryStatus}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600">Update:</span>
                <select
                  value={selectedEnquiry.enquiryStatus}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  disabled={updating}
                  className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900 focus:outline-none"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client info & quick contact */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <h3 className="font-bold text-stone-900">Contact Details</h3>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedEnquiry.customer.phone}`}
                    className="p-1.5 bg-saffron-100 text-saffron-700 rounded-lg hover:bg-saffron-200"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${selectedEnquiry.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Namaste ${selectedEnquiry.customer.name}, Regarding your catering enquiry for ${selectedEnquiry.eventType} on ${selectedEnquiry.eventDate}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <p><strong>Name:</strong> {selectedEnquiry.customer.name}</p>
              <p><strong>Phone:</strong> {selectedEnquiry.customer.phone}</p>
              <p><strong>Email:</strong> {selectedEnquiry.customer.email}</p>
              <p><strong>Event Date:</strong> <span className="font-bold text-saffron-700">{selectedEnquiry.eventDate}</span></p>
              <p><strong>Venue Location:</strong> {selectedEnquiry.eventLocation}</p>
              <p><strong>Estimated Budget:</strong> {selectedEnquiry.estimatedBudget || 'Not specified'}</p>
            </div>

            {/* Menu */}
            <div>
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
                Requested Food Menu &amp; Delicacies
              </h4>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800 whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.requiredItems}
              </div>
            </div>

            {selectedEnquiry.additionalRequirements && (
              <div>
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
                  Additional Dietary Notes
                </h4>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  {selectedEnquiry.additionalRequirements}
                </div>
              </div>
            )}

            {/* Internal Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                Internal Follow-Up Notes
              </label>
              <textarea
                rows="2"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="e.g. Discussed live counters. Sent quotation of ₹280/plate on WhatsApp. Client to confirm by Friday."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none"
              />
              <button
                onClick={handleSaveNotes}
                disabled={updating}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold transition"
              >
                Save Internal Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCateringPage;
