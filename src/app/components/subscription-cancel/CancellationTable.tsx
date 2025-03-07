import { Cancellation, CancellationSortField } from '@/types/cancellation';
import { HeaderItem } from '@/types/tableHeader';
import { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import Pagination from '../common/Pagination';

interface CancellationTableProps {
  cancellations: Cancellation[];
  onRefund: (cancellation: Cancellation) => void;
}

export default function CancellationTable({ cancellations, onRefund }: CancellationTableProps) {
  const [sortField, setSortField] = useState<CancellationSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

  const handleSort = (field: CancellationSortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortField(null);
        setSortOrder('asc');
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedCancellations = [...cancellations].sort((a, b) => {
    if (!sortField) return 0;

    let aValue, bValue;

    if (typeof sortField === 'string' && sortField.startsWith('user.')) {
      const field = sortField.split('.')[1];
      aValue = a.user[field as keyof typeof a.user];
      bValue = b.user[field as keyof typeof b.user];
    } else {
      aValue = a[sortField as keyof Cancellation];
      bValue = b[sortField as keyof Cancellation];
    }

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
  });

  const paginatedCancellations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedCancellations.slice(startIndex, endIndex);
  }, [sortedCancellations, currentPage]);

  const COMBINED_HEADERS: HeaderItem<CancellationSortField>[] = [
    { field: 'user.name', label: '이름', type: 'sortable' },
    { field: 'user.email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'user.phone', label: '전화번호', type: 'sortable' },
    { field: 'cancelled_date', label: '취소일자', type: 'sortable' },
    { field: undefined, label: '취소사유', type: 'static' },
    { field: undefined, label: '환불처리', type: 'static' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="border-y bg-[#F3F3F3]">
            {COMBINED_HEADERS.map((header, index) =>
              header.type === 'sortable' && header.field ? (
                <SortableHeader<CancellationSortField>
                  key={header.field}
                  field={header.field}
                  label={header.label}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              ) : (
                <th key={index} className="px-3 py-4 text-[1.5rem] text-center">
                  {header.label}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedCancellations.map((cancellation, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 text-[1.5rem] text-center">{cancellation.user.name}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.user.email}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.user.phone}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.cancelled_date}</td>
              <td className="py-2 text-[1.5rem] text-center">
                {(() => {
                  switch (cancellation.cancelled_reason) {
                    case 'expensive':
                      return '가격이 비싸서';
                    case 'quality':
                      return '퀄리티가 마음에 들지 않아서';
                    case 'slow_communication':
                      return '소통이 느려서';
                    case 'hire_full_time':
                      return '정식원을 구하는 것이 더 편해서';
                    case 'buget_cut':
                      return '회사 예산이 줄어들어서';
                    default:
                      return cancellation.cancelled_reason;
                  }
                })()}
              </td>
              <td className="py-2 text-[1.5rem] text-center">
                {cancellation.refund_status === 'refund_pending' ? (
                  <button
                    onClick={() => {
                      onRefund(cancellation);
                    }}
                    className="w-[7rem] py-2 text-[1.5rem] border border-black rounded-[1.2rem]"
                  >
                    환불
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>{cancellation.refund_date}</span>
                    <span>{Number(cancellation.refund_amount).toLocaleString()}원</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cancellations.length > itemsPerPage && (
        <Pagination
          totalItems={cancellations.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
