import AppLayout from '@/layouts/app-layout';
import { Category, Item, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Item',
        href: '/items/create',
    },
];

interface Props {
    item?: Item;
    categories: Category[];
}

export default function Form({ item, categories }: Props) {
    const isEdit = Boolean(item?.id);

    const initial = {
        code: item?.code ?? '',
        name: item?.name ?? '',
        unit: item?.unit ?? '',
        min_stock: Number(item?.min_stock ?? 0),
        category_id: Number(item?.category_id ?? 0),
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
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
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
                            value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            Minimum Stock
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.min_stock}
                            onChange={(e) =>
                                setData('min_stock', Number(e.target.value))
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            className="w-full rounded border p-2"
                            value={data.category_id}
                            onChange={(e) =>
                                setData('category_id', Number(e.target.value))
                            }
                        >
                            <option value="" className="bg-black">
                                Select Category
                            </option>
                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                    className="bg-black"
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
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
