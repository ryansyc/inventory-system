import AppLayout from '@/layouts/app-layout';
import { Category, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const HREF = 'categories';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Item',
        href: `${HREF}/create`,
    },
];

interface Props {
    category?: Category;
}

export default function Form({ category }: Props) {
    const isEdit = Boolean(category?.id);

    const initial = {
        name: category?.name ?? '',
    };

    const { data, setData, post, patch } = useForm(initial);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            patch(`/${HREF}/${category?.id}`);
        } else {
            post(`/${HREF}`);
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
                            Category Name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
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
