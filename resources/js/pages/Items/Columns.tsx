'use client';

import { ColumnDef } from '@tanstack/react-table';

export interface Item {
    id: number;
    barcode: string;
    name: string;
    uom: string;
    status: string;
}

export const columns: ColumnDef<Item>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'barcode',
        header: 'Barcode',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'uom',
        header: 'UOM',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
];
