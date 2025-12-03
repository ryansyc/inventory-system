import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type Item } from '@/types/index';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Item',
        href: '/items/edit',
    },
];

interface Props {
    item: Item;
}

export default function Edit({ item }: Props) {
    const { data, setData, patch } = useForm({
        barcode: item.barcode ?? '',
        name: item.name ?? '',
        unit_measurement: item.unit_measurement ?? '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch('/items/' + item.id);
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
                            Item Barcode
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.barcode}
                            onChange={(e) => setData('barcode', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Item Name</label>
                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            Unit Measurement
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.unit_measurement}
                            onChange={(e) =>
                                setData('unit_measurement', e.target.value)
                            }
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
