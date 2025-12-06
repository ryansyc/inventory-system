import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transaction } from '@/types/index';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

interface Props {
    transactions: Transaction[];
}

export default function Index({ transactions }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm(`Are you sure you want to delete this transaction?`)) {
            destroy(`/transactions/${id}`);
            alert(`Deleted ${name}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="m-4">
                <Link href="transactions/create">
                    <Button className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600">
                        Create
                    </Button>
                </Link>
            </div>
            <div className="m-4">
                <Table>
                    <TableCaption>A list of your transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-center">
                                No
                            </TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((data, index) => (
                            <TableRow key={data.id}>
                                <TableCell className="text-center">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{data.type}</TableCell>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>{data.total_amount}</TableCell>
                                <TableCell>{data.notes}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-4">
                                        <a
                                            href={`/transactions/${data.id}/edit`}
                                            className="transactions-center flex gap-1 text-yellow-300 hover:cursor-pointer hover:text-yellow-400"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </a>
                                        <a
                                            className="transactions-center flex gap-1 text-red-400 hover:cursor-pointer hover:text-red-500"
                                            onClick={() =>
                                                handleDelete(data.id)
                                            }
                                        >
                                            <Trash size={16} />
                                            Delete
                                        </a>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
