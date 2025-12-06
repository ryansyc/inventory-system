import AppLayout from '@/layouts/app-layout';
import { Item, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Item',
        href: '/items/create',
    },
];

interface Props {
    item?: Item;
}

export default function Form({ item }: Props) {
    const isEdit = Boolean(item?.id);

    const initial = {
        code: item?.code ?? '',
        name: item?.name ?? '',
        unit: item?.unit ?? '',
        stock: item?.stock ?? '',
    };

    const { data, setData, post, patch } = useForm(initial);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            patch(`/items/${item?.id}`);
        } else {
            post('/items');
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
                        <label className="text-sm font-medium">Item Code</label>
                        <input
                            className="w-full rounded border p-2"
                            onChange={(e) => setData('code', e.target.value)}
                            placeholder="Kode barang"
                            required
                            type="text"
                            value={data.code}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Item Name</label>
                        <input
                            className="w-full rounded border p-2"
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Nama barang"
                            required
                            type="text"
                            value={data.name}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Unit</label>
                        <input
                            className="w-full rounded border p-2"
                            onChange={(e) => setData('unit', e.target.value)}
                            placeholder="Satuan barang"
                            required
                            type="text"
                            value={data.unit}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Stock</label>
                        <input
                            className="w-full rounded border p-2"
                            onChange={(e) => setData('stock', e.target.value)}
                            placeholder="Stok barang"
                            required
                            type="number"
                            value={data.stock}
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
