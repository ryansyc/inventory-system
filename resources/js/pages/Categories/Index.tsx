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
import { Category, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            destroy(`/categories/${id}`);
            alert(`Deleted ${name}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="m-4">
                <Link href={`/categories/create`}>
                    <Button className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600">
                        Create
                    </Button>
                </Link>
            </div>
            <div className="m-4">
                <Table>
                    <TableCaption>A list of your categories.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-4">
                                        <Link
                                            href={`/categories/${data.id}/edit`}
                                            className="flex items-center gap-1 text-yellow-300 hover:cursor-pointer hover:text-yellow-400"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </Link>
                                        <Link
                                            className="flex items-center gap-1 text-red-400 hover:cursor-pointer hover:text-red-500"
                                            onClick={() =>
                                                handleDelete(data.id, data.name)
                                            }
                                        >
                                            <Trash size={16} />
                                            Delete
                                        </Link>
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
