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
import { Item } from '@/types/index';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Items',
        href: '/items',
    },
];

interface Props {
    items: Item[];
}

export default function Index({ items }: Props) {
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            destroy(`/items/${id}`);
            alert(`Deleted ${name}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="m-4">
                <Link href="items/create">
                    <Button>Create</Button>
                </Link>
            </div>
            {items.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your items.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Barcode</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Unit of Measurement</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.id}
                                    </TableCell>
                                    <TableCell>{item.barcode}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.unit_measurement}
                                    </TableCell>
                                    <TableCell className="flex justify-end gap-4 text-right">
                                        <Link
                                            href={`items/${item.id}/edit`}
                                            className="font-medium text-yellow-300 hover:text-yellow-400"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            onClick={() =>
                                                handleDelete(item.id, item.name)
                                            }
                                            disabled={processing}
                                            className="font-medium text-red-400 hover:text-red-500"
                                        >
                                            Delete
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
