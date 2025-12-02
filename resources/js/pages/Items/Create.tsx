import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Item',
        href: '/items/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        barcode: '',
        name: '',
        unit_measurement: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/items');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className=" flex items-center justify-center w-full h-full">
                <form onSubmit={handleSubmit} className="p-6 rounded-xl shadow w-full max-w-sm space-y-4 bg-neutral-900">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Item Barcode</label>
                        <input type="text" className="w-full border p-2 rounded" value={data.barcode} onChange={(e) => setData('barcode', e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Item Name</label>
                        <input type="text" className="w-full border p-2 rounded" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Unit Measurement</label>
                        <input type="text" className="w-full border p-2 rounded" value={data.unit_measurement} onChange={(e) => setData('unit_measurement', e.target.value)}/>
                    </div>
                    <button className="w-full p-2 bg-indigo-600 rounded hover:bg-indigo-700 hover:cursor-pointer" type="submit">Submit</button>
                </form>
            </div>

        </AppLayout>
    );
}
