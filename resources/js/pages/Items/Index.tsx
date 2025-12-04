import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Item } from '@/types/index';
import { Head, Link, useForm } from '@inertiajs/react';
import { columns } from './Columns';
import { DataTable } from './DataTable';

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

    const data = items.map((item) => ({
        id: item.id,
        barcode: item.barcode,
        name: item.name,
        uom: item.uom,
        status: item.status,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="m-4">
                <Link href="items/create">
                    <Button className="bg-blue-500 text-white hover:bg-blue-600">
                        Create
                    </Button>
                </Link>
            </div>
            <div className="m-4">
                <DataTable columns={columns} data={data} />
            </div>
        </AppLayout>
    );
}
