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
import { Pencil, Trash } from 'lucide-react';

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
    const { delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            destroy(`/items/${id}`);
            alert(`Deleted ${name}`);
        }
    };

    const data = items.map((item) => ({
        id: item.id,
        code: item.code,
        name: item.name,
        unit: item.unit,
        stock: item.stock,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="m-4">
                <Link href="items/create">
                    <Button className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600">
                        Create
                    </Button>
                </Link>
            </div>
            <div className="m-4">
                <Table>
                    <TableCaption>A list of your items.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-center">
                                No
                            </TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-4">
                                        <a
                                            href={`/items/${item.id}/edit`}
                                            className="flex items-center gap-1 text-yellow-300 hover:cursor-pointer hover:text-yellow-400"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </a>
                                        <a
                                            className="flex items-center gap-1 text-red-400 hover:cursor-pointer hover:text-red-500"
                                            onClick={() =>
                                                handleDelete(item.id, item.name)
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
