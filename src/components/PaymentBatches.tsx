import { useState } from 'react';
import { Search, Download, Eye, X, Calendar, Filter, DollarSign, ChevronDown, ChevronUp, FileSpreadsheet, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function PaymentBatches() {
  const [activeMainTab, setActiveMainTab] = useState<'batches' | 'transactions'>('batches');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [viewingBatch, setViewingBatch] = useState<any>(null);
  const [sortColumn, setSortColumn] = useState<string>('batchDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Batch Transactions tab state
  const [transactionSearchTerm, setTransactionSearchTerm] = useState('');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');
  const [filterPaymentType, setFilterPaymentType] = useState('all');
  const [transactionSortColumn, setTransactionSortColumn] = useState<string>('transactionDate');
  const [transactionSortDirection, setTransactionSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showKPIs, setShowKPIs] = useState(false);

  // Mock data for payment batches
  const batches = [
    { 
      id: 1, 
      batchId: 'BATCH-2026-02-04-001', 
      batchDate: '2026-02-04T08:30:00', 
      totalTransactions: 15, 
      totalAmount: 3250.00, 
      status: 'Completed',
      createdDate: '2026-02-04 08:00 AM',
      createdBy: 'System Auto-Batch',
      processedDate: '2026-02-04 02:30 PM',
      processedBy: 'Patrick Cruz',
      notes: 'Regular daily batch processed successfully.'
    },
    { 
      id: 2, 
      batchId: 'BATCH-2026-02-04-002', 
      batchDate: '2026-02-04T14:15:00', 
      totalTransactions: 8, 
      totalAmount: 1890.00, 
      status: 'In Process',
      createdDate: '2026-02-04 02:00 PM',
      createdBy: 'System Auto-Batch',
      processedDate: null,
      processedBy: null,
      notes: 'Afternoon batch - processing payment adjustments.'
    },
    { 
      id: 3, 
      batchId: 'BATCH-2026-02-03-001', 
      batchDate: '2026-02-03T09:00:00', 
      totalTransactions: 12, 
      totalAmount: 2890.00, 
      status: 'Completed',
      createdDate: '2026-02-03 08:00 AM',
      createdBy: 'System Auto-Batch',
      processedDate: '2026-02-03 03:45 PM',
      processedBy: 'Kimmy Clifton',
      notes: ''
    },
    { 
      id: 4, 
      batchId: 'BATCH-2026-02-03-002', 
      batchDate: '2026-02-03T16:30:00', 
      totalTransactions: 6, 
      totalAmount: 1240.00, 
      status: 'Completed',
      createdDate: '2026-02-03 04:00 PM',
      createdBy: 'Tashanna Sawyer',
      processedDate: '2026-02-03 05:15 PM',
      processedBy: 'Tashanna Sawyer',
      notes: 'Late afternoon batch - urgent payments.'
    },
    { 
      id: 5, 
      batchId: 'BATCH-2026-02-02-001', 
      batchDate: '2026-02-02T08:30:00', 
      totalTransactions: 8, 
      totalAmount: 1675.00, 
      status: 'Completed',
      createdDate: '2026-02-02 08:00 AM',
      createdBy: 'System Auto-Batch',
      processedDate: '2026-02-02 03:15 PM',
      processedBy: 'Kimmy Clifton',
      notes: ''
    },
    { 
      id: 6, 
      batchId: 'BATCH-2026-02-01-001', 
      batchDate: '2026-02-01T09:15:00', 
      totalTransactions: 20, 
      totalAmount: 4120.00, 
      status: 'Completed',
      createdDate: '2026-02-01 08:00 AM',
      createdBy: 'System Auto-Batch',
      processedDate: '2026-02-01 04:45 PM',
      processedBy: 'Patrick Cruz',
      notes: 'End of month batch - higher volume than usual.'
    },
    { 
      id: 7, 
      batchId: 'BATCH-2026-02-01-002', 
      batchDate: '2026-02-01T15:00:00', 
      totalTransactions: 14, 
      totalAmount: 2950.00, 
      status: 'Completed',
      createdDate: '2026-02-01 02:30 PM',
      createdBy: 'Patrick Cruz',
      processedDate: '2026-02-01 06:20 PM',
      processedBy: 'Patrick Cruz',
      notes: 'Second batch for end of month processing.'
    },
    { 
      id: 8, 
      batchId: 'BATCH-2026-01-31-001', 
      batchDate: '2026-01-31T08:45:00', 
      totalTransactions: 18, 
      totalAmount: 3980.00, 
      status: 'Completed',
      createdDate: '2026-01-31 08:00 AM',
      createdBy: 'System Auto-Batch',
      processedDate: '2026-01-31 02:20 PM',
      processedBy: 'Tashanna Sawyer',
      notes: ''
    },
    { 
      id: 9, 
      batchId: 'BATCH-2026-01-31-002', 
      batchDate: '2026-01-31T13:30:00', 
      totalTransactions: 10, 
      totalAmount: 2100.00, 
      status: 'Completed',
      createdDate: '2026-01-31 01:00 PM',
      createdBy: 'System Auto-Batch',
      processedDate: '2026-01-31 04:45 PM',
      processedBy: 'Jennifer Staley',
      notes: 'Additional batch for month-end close.'
    },
    { 
      id: 10, 
      batchId: 'BATCH-2026-01-30-001', 
      batchDate: '2026-01-30T10:00:00', 
      totalTransactions: 10, 
      totalAmount: 2340.00, 
      status: 'Pending',
      createdDate: '2026-01-30 08:00 AM',
      createdBy: 'System Auto-Batch',
      processedDate: null,
      processedBy: null,
      notes: ''
    },
  ];

  // Sample completed payments data
  const completedPayments = [
    {
      id: 1,
      paymentId: 'PAY-2026-001',
      requestId: 'REQ-2026-002',
      participantId: 'P-2025-156',
      participantName: 'Sarah Johnson',
      study: 'NDR-2025-042',
      disbursementCurrency: 'USD',
      amountInDisbursementCurrency: 75.00,
      transactionDate: '2026-01-15',
      transactionType: 'Reimbursement',
      transactionSubType: 'Parking',
      paymentType: 'Direct Deposit',
      paymentSubtype: 'ACH',
      milestone: 'Visit 1',
      paymentMethod: 'Bank Transfer',
      approver: 'Patrick Cruz',
      approveDate: '2026-01-10',
      approvalNotes: 'All documentation verified and complete'
    },
    {
      id: 2,
      paymentId: 'PAY-2026-002',
      requestId: 'REQ-2026-006',
      participantId: 'P-2025-178',
      participantName: 'Linda Martinez',
      study: 'DPT-2025-019',
      disbursementCurrency: 'USD',
      amountInDisbursementCurrency: 35.00,
      transactionDate: '2026-01-14',
      transactionType: 'Reimbursement',
      transactionSubType: 'Meal',
      paymentType: 'Check',
      paymentSubtype: 'Paper Check',
      milestone: 'Visit 2',
      paymentMethod: 'Mail Check',
      approver: 'Tashanna Sawyer',
      approveDate: '2026-01-08',
      approvalNotes: 'Meal receipts reviewed and approved'
    },
    {
      id: 3,
      paymentId: 'PAY-2025-045',
      requestId: 'REQ-2025-005',
      participantId: 'P-2025-234',
      participantName: 'Robert Wilson',
      study: 'CIS-2025-055',
      disbursementCurrency: 'USD',
      amountInDisbursementCurrency: 200.00,
      transactionDate: '2026-01-05',
      transactionType: 'Payment',
      transactionSubType: 'Stipend',
      paymentType: 'Direct Deposit',
      paymentSubtype: 'ACH',
      milestone: 'Monthly Participation',
      paymentMethod: 'Bank Transfer',
      approver: 'Kimmy Clifton',
      approveDate: '2025-12-30',
      approvalNotes: 'Monthly participation payment approved'
    },
    {
      id: 4,
      paymentId: 'PAY-2025-046',
      requestId: 'REQ-2025-008',
      participantId: 'P-2025-298',
      participantName: 'David Anderson',
      study: 'ATE-2025-031',
      disbursementCurrency: 'USD',
      amountInDisbursementCurrency: 300.00,
      transactionDate: '2026-01-08',
      transactionType: 'Payment',
      transactionSubType: 'Completion Bonus',
      paymentType: 'Direct Deposit',
      paymentSubtype: 'ACH',
      milestone: 'Study Completion',
      paymentMethod: 'Bank Transfer',
      approver: 'Jennifer Staley',
      approveDate: '2026-01-02',
      approvalNotes: 'Final study completion payment - all milestones met'
    },
    {
      id: 5,
      paymentId: 'PAY-2026-003',
      requestId: 'REQ-2025-087',
      participantId: 'P-2025-089',
      participantName: 'Maria Garcia',
      study: 'CHS-2026-001',
      disbursementCurrency: 'USD',
      amountInDisbursementCurrency: 150.00,
      transactionDate: '2026-01-12',
      transactionType: 'Reimbursement',
      transactionSubType: 'Travel',
      paymentType: 'Prepaid Card',
      paymentSubtype: 'Visa Gift Card',
      milestone: 'Visit 3',
      paymentMethod: 'Prepaid Card',
      approver: 'Dr. Sarah Chen',
      approveDate: '2026-01-06',
      approvalNotes: 'Mileage reimbursement approved - 60 miles @ $2.50/mile'
    },
    {
      id: 6,
      paymentId: 'PAY-2026-004',
      requestId: 'REQ-2025-123',
      participantId: 'P-2025-045',
      participantName: 'Thomas Lee',
      study: 'PNS-2026-008',
      disbursementCurrency: 'USD',
      amountInDisbursementCurrency: 100.00,
      transactionDate: '2026-01-18',
      transactionType: 'Payment',
      transactionSubType: 'Stipend',
      paymentType: 'Direct Deposit',
      paymentSubtype: 'ACH',
      milestone: 'Baseline Visit',
      paymentMethod: 'Bank Transfer',
      approver: 'Douglas Ross',
      approveDate: '2026-01-14',
      approvalNotes: 'Baseline visit compensation approved'
    },
    {
      id: 7,
      paymentId: 'PAY-2026-005',
      requestId: 'REQ-2025-156',
      participantId: 'P-2025-201',
      participantName: 'Angela White',
      study: 'DPT-2025-019',
      disbursementCurrency: 'USD',
      amountInDisbursementCurrency: 50.00,
      transactionDate: '2026-01-20',
      transactionType: 'Reimbursement',
      transactionSubType: 'Parking',
      paymentType: 'Check',
      paymentSubtype: 'Paper Check',
      milestone: 'Visit 1',
      paymentMethod: 'Mail Check',
      approver: 'Ted Noravong',
      approveDate: '2026-01-16',
      approvalNotes: 'Parking fees verified and approved'
    },
    {
      id: 8,
      paymentId: 'PAY-2026-006',
      requestId: 'REQ-2026-034',
      participantId: 'P-2026-012',
      participantName: 'Christopher Brown',
      study: 'NDR-2025-042',
      disbursementCurrency: 'USD',
      amountInDisbursementCurrency: 250.00,
      transactionDate: '2026-01-22',
      transactionType: 'Payment',
      transactionSubType: 'Incentive',
      paymentType: 'Direct Deposit',
      paymentSubtype: 'ACH',
      milestone: '6-Month Follow-up',
      paymentMethod: 'Bank Transfer',
      approver: 'Megan Hummelgaard',
      approveDate: '2026-01-19',
      approvalNotes: 'Follow-up visit incentive approved'
    }
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleTransactionSort = (column: string) => {
    if (transactionSortColumn === column) {
      setTransactionSortDirection(transactionSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setTransactionSortColumn(column);
      setTransactionSortDirection('asc');
    }
  };

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batchId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || batch.status === filterStatus;
    
    const batchDate = new Date(batch.batchDate);
    const matchesDateFrom = !filterDateFrom || batchDate >= new Date(filterDateFrom);
    const matchesDateTo = !filterDateTo || batchDate <= new Date(filterDateTo);
    
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  }).sort((a, b) => {
    let aValue: any = a[sortColumn as keyof typeof a];
    let bValue: any = b[sortColumn as keyof typeof b];
    
    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    // Special handling for dates
    if (sortColumn === 'batchDate') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else {
      // Convert to string for comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const filteredPayments = completedPayments.filter(payment => {
    const matchesSearch = payment.participantName.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
                         payment.participantId.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
                         payment.study.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
                         payment.paymentId.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
                         payment.requestId.toLowerCase().includes(transactionSearchTerm.toLowerCase());
    const matchesPaymentMethod = filterPaymentMethod === 'all' || payment.paymentMethod === filterPaymentMethod;
    const matchesPaymentType = filterPaymentType === 'all' || payment.paymentType === filterPaymentType;
    
    return matchesSearch && matchesPaymentMethod && matchesPaymentType;
  }).sort((a, b) => {
    let aValue: any = a[transactionSortColumn as keyof typeof a];
    let bValue: any = b[transactionSortColumn as keyof typeof b];
    
    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    // Special handling for dates and amounts
    if (transactionSortColumn === 'transactionDate' || transactionSortColumn === 'approveDate') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else if (transactionSortColumn === 'amountInDisbursementCurrency') {
      // Already numbers, no conversion needed
    } else {
      // Convert to string for comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }
    
    if (transactionSortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Calculate KPIs
  const totalPayments = completedPayments.length;
  const totalAmount = completedPayments.reduce((sum, p) => sum + p.amountInDisbursementCurrency, 0);
  const avgPayment = totalAmount / totalPayments;
  const thisMonthPayments = completedPayments.filter(p => p.transactionDate >= '2026-01-01').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Process':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (batch: any) => {
    toast.success('Batch Export Started', {
      description: `Downloading ${batch.batchId}...`,
      duration: 2000,
    });
  };

  const exportToExcel = () => {
    toast.success('Completed Payments exported to Excel successfully');
  };

  return (
    <div className="space-y-6">
      {/* Section Header with Action Buttons */}
      <div className="bg-white border-l-4 border-ku-blue rounded-lg shadow-sm p-5 flex items-center justify-between">
        {/* Left Side - Icon and Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-sm">
            <FileSpreadsheet className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl text-gray-800 font-semibold">Payment Batches</h2>
            <p className="text-gray-600 text-sm">Manage and review payment batches</p>
          </div>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center gap-2">
          {activeMainTab === 'transactions' && (
            <>
              <button 
                onClick={() => setShowKPIs(!showKPIs)}
                className="p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                title={showKPIs ? 'Hide Key Performance Indicators' : 'Show Key Performance Indicators'}
              >
                {showKPIs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 font-medium transition-all"
                title="Export to Excel"
              >
                <FileSpreadsheet size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveMainTab('batches')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeMainTab === 'batches'
                ? 'border-[#0051BA] text-[#0051BA]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Payment Batch
          </button>
          <button
            onClick={() => setActiveMainTab('transactions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeMainTab === 'transactions'
                ? 'border-[#0051BA] text-[#0051BA]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Batch Transactions
          </button>
        </nav>
      </div>

      {/* Payment Batch Tab Content */}
      {activeMainTab === 'batches' && (
        <>
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Batch ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Process">In Process</option>
                  <option value="Completed">Completed</option>
                </select>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                    placeholder="Date From"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={filterDateTo}
                    onChange={(e) => setFilterDateTo(e.target.value)}
                    placeholder="Date To"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Batches Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('batchId')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Batch ID
                        {sortColumn === 'batchId' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('batchDate')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Batch Date
                        {sortColumn === 'batchDate' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('totalTransactions')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Total Transactions
                        {sortColumn === 'totalTransactions' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('totalAmount')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Total Amount
                        {sortColumn === 'totalAmount' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Status
                        {sortColumn === 'status' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBatches.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No batches found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredBatches.map((batch) => (
                      <tr key={batch.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setViewingBatch(batch)}
                            className="text-[#0051BA] hover:text-[#003d8f] font-medium"
                          >
                            {batch.batchId}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(batch.batchDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(batch.batchDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {batch.totalTransactions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          ${batch.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(batch.status)}`}>
                            {batch.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewingBatch(batch)}
                              className="p-2 text-[#0051BA] hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Batch"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDownload(batch)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Download Batch"
                            >
                              <Download size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Batch Transactions Tab Content */}
      {activeMainTab === 'transactions' && (
        <>
          {/* Collapsible Statistics */}
          {showKPIs && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Total Payments</p>
                  <DollarSign className="text-green-500" size={24} />
                </div>
                <p className="text-3xl font-bold">{totalPayments}</p>
                <p className="text-sm text-gray-500 mt-1">All time</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Total Amount</p>
                  <DollarSign className="text-blue-500" size={24} />
                </div>
                <p className="text-3xl font-bold">${totalAmount.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">All payments</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Average Payment</p>
                  <DollarSign className="text-purple-500" size={24} />
                </div>
                <p className="text-3xl font-bold">${avgPayment.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">Per transaction</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">This Month</p>
                  <DollarSign className="text-orange-500" size={24} />
                </div>
                <p className="text-3xl font-bold">{thisMonthPayments}</p>
                <p className="text-sm text-gray-500 mt-1">January 2026</p>
              </div>
            </div>
          )}

          {/* Payments List */}
          <div className="bg-white rounded-lg shadow">
            {/* Filters and Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by participant, payment ID, request ID, or study..."
                    value={transactionSearchTerm}
                    onChange={(e) => setTransactionSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051BA]"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-gray-400" />
                  <select
                    value={filterPaymentMethod}
                    onChange={(e) => setFilterPaymentMethod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051BA]"
                  >
                    <option value="all">All Payment Methods</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Mail Check">Mail Check</option>
                    <option value="Prepaid Card">Prepaid Card</option>
                  </select>

                  <select
                    value={filterPaymentType}
                    onChange={(e) => setFilterPaymentType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051BA]"
                  >
                    <option value="all">All Payment Types</option>
                    <option value="Direct Deposit">Direct Deposit</option>
                    <option value="Check">Check</option>
                    <option value="Prepaid Card">Prepaid Card</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('paymentId')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Payment ID
                        {transactionSortColumn === 'paymentId' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('requestId')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Request ID
                        {transactionSortColumn === 'requestId' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('participantName')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Participant
                        {transactionSortColumn === 'participantName' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('study')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Study
                        {transactionSortColumn === 'study' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600">Disbursement Currency</th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('amountInDisbursementCurrency')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Amount
                        {transactionSortColumn === 'amountInDisbursementCurrency' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('transactionDate')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Transaction Date
                        {transactionSortColumn === 'transactionDate' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('transactionType')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Transaction Type
                        {transactionSortColumn === 'transactionType' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600">Transaction SubType</th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('paymentType')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Payment Type
                        {transactionSortColumn === 'paymentType' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600">Payment Subtype</th>
                    <th className="px-6 py-3 text-left text-gray-600">Milestone</th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('paymentMethod')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Payment Method
                        {transactionSortColumn === 'paymentMethod' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('approver')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Approver
                        {transactionSortColumn === 'approver' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button onClick={() => handleTransactionSort('approveDate')} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                        Approve Date
                        {transactionSortColumn === 'approveDate' ? (transactionSortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : (<ArrowUpDown size={14} className="opacity-40" />)}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600">Approval Notes</th>
                    <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0051BA]">{payment.paymentId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.requestId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium">{payment.participantName}</p>
                          <p className="text-xs text-gray-500">{payment.participantId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.study}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{payment.disbursementCurrency}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${payment.amountInDisbursementCurrency.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.transactionDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.transactionType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.transactionSubType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.paymentType === 'Direct Deposit' ? 'bg-blue-100 text-blue-800' :
                          payment.paymentType === 'Check' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {payment.paymentType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.paymentSubtype}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.milestone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.paymentMethod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.approver}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.approveDate}</td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-sm text-gray-600 truncate" title={payment.approvalNotes}>
                          {payment.approvalNotes}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-2 text-[#0051BA] hover:bg-blue-50 rounded" 
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            className="p-2 text-green-600 hover:bg-green-50 rounded" 
                            title="Download Receipt"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredPayments.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No completed payments found</p>
                <p className="text-sm mt-1">Adjust your filters to see more results</p>
              </div>
            )}

            {filteredPayments.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-gray-600">
                  Showing {filteredPayments.length} of {completedPayments.length} payments
                </p>
                <p className="text-gray-600 font-medium">
                  Total: ${filteredPayments.reduce((sum, p) => sum + p.amountInDisbursementCurrency, 0).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* View Panel */}
      {viewingBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
          <div className="bg-white h-full w-full max-w-2xl shadow-xl flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{viewingBatch.batchId}</h2>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingBatch.status)}`}>
                  {viewingBatch.status}
                </span>
              </div>
              <button
                onClick={() => setViewingBatch(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Batch Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Batch ID</label>
                      <p className="mt-1 text-gray-900">{viewingBatch.batchId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Batch Date</label>
                      <p className="mt-1 text-gray-900">
                        {new Date(viewingBatch.batchDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Status</label>
                      <p className="mt-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingBatch.status)}`}>
                          {viewingBatch.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Total Amount</label>
                      <p className="mt-1 text-gray-900 font-semibold">${viewingBatch.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Total Transactions</label>
                      <p className="mt-1 text-gray-900">{viewingBatch.totalTransactions}</p>
                    </div>
                  </div>
                </div>

                {/* Processing Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Created Date</label>
                      <p className="mt-1 text-gray-900">{viewingBatch.createdDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Created By</label>
                      <p className="mt-1 text-gray-900">{viewingBatch.createdBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Processed Date</label>
                      <p className="mt-1 text-gray-900">{viewingBatch.processedDate || 'Not yet processed'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Processed By</label>
                      <p className="mt-1 text-gray-900">{viewingBatch.processedBy || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Notes/Comments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes / Comments</h3>
                  <textarea
                    value={viewingBatch.notes}
                    readOnly
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 resize-none"
                    placeholder="No notes available for this batch."
                  />
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => handleDownload(viewingBatch)}
                className="px-4 py-2 bg-[#0051BA] text-white rounded-lg hover:bg-[#003d8f] transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Download Batch
              </button>
              <button
                onClick={() => setViewingBatch(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}