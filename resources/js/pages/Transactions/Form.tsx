import AppLayout from '@/layouts/app-layout';
import { Transaction, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Transaction',
        href: '/transactions/create',
    },
];

interface Props {
    transaction?: Transaction;
}

export default function Form({ transaction }: Props) {
    const isEdit = Boolean(transaction?.id);

    const initial = {
        type: transaction?.type ?? '',
        date: transaction?.date ?? Date.now().toString(),
        total_amount: transaction?.total_amount ?? '',
        notes: transaction?.notes ?? '',
    };

    const { data, setData, post, patch } = useForm(initial);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            patch(`/transactions/${transaction?.id}`);
        } else {
            post('/transactions');
        }

        alert('Process successfully');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="flex h-full w-full items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm space-y-4 rounded-xl bg-neutral-900 p-6 shadow"
                >
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            Transaction Type
                        </label>
                        <select
                            className="w-full rounded border p-2 dark:bg-neutral-900"
                            onChange={(e) => setData('type', e.target.value)}
                            required
                            value={data.type}
                        >
                            <option value="">Select Type</option>
                            <option value="in">In</option>
                            <option value="out">Out</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Date</label>
                        <input
                            className="w-full rounded border p-2"
                            onChange={(e) => setData('date', e.target.value)}
                            required
                            type="date"
                            value={data.date}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            Total Amount
                        </label>
                        <input
                            className="w-full rounded border p-2"
                            onChange={(e) =>
                                setData('total_amount', e.target.value)
                            }
                            placeholder="Total amount"
                            required
                            type="number"
                            value={data.total_amount}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Notes</label>
                        <textarea
                            className="w-full rounded border p-2"
                            onChange={(e) => setData('notes', e.target.value)}
                            placeholder="Notes"
                            required
                            value={data.notes}
                        />
                    </div>
                    <button
                        className="w-full rounded bg-indigo-600 p-2 hover:cursor-pointer hover:bg-indigo-700"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
