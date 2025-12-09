import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { FormData, type BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Incoming Transactions",
        href: "/transactions/create",
    },
];

export default function Incoming() {
    const { data, setData, post } = useForm<FormData>({
        type: "in",
        notes: "",
        items: [{ code: "", name: "", unit: "", quantity: null }],
    });

    const handleCodeChange = async (value: string, index: number) => {
        const items = [...data.items];
        items[index].code = value;
        setData("items", items);

        if (value.trim() === "") return;

        const response = await fetch(`/items/find/${value}`);
        const item = await response.json();

        if (item) {
            const updated = [...data.items];
            updated[index] = {
                code: updated[index].code ?? "",
                name: item.name ?? "",
                unit: item.unit ?? "",
                quantity: null,
            };
            setData("items", updated);
        }
    };

    const addRow = () => {
        setData("items", [
            ...data.items,
            { code: "", name: "", unit: "", quantity: null },
        ]);
    };

    const removeRow = (index: number) => {
        setData(
            "items",
            data.items.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        post("/transactions");
        alert("Process successfully");
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-10 p-10">
                    <div className="w-3/4 rounded-md bg-neutral-50 p-5 drop-shadow-xl dark:bg-neutral-900">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px] text-center">
                                        No
                                    </TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Quantity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                required
                                                type="text"
                                                value={item.code ?? ""}
                                                onChange={(e) =>
                                                    handleCodeChange(
                                                        e.target.value,
                                                        index
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                required
                                                type="text"
                                                value={item.name ?? ""}
                                                onChange={(e) => {
                                                    const items = [
                                                        ...data.items,
                                                    ];
                                                    items[index].name =
                                                        e.target.value;
                                                    setData("items", items);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                required
                                                type="text"
                                                value={item.unit ?? ""}
                                                onChange={(e) => {
                                                    const items = [
                                                        ...data.items,
                                                    ];
                                                    items[index].unit =
                                                        e.target.value;
                                                    setData("items", items);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                required
                                                type="number"
                                                value={
                                                    item.quantity === null
                                                        ? ""
                                                        : item.quantity
                                                }
                                                onChange={(e) => {
                                                    const items = [
                                                        ...data.items,
                                                    ];
                                                    const raw = e.target.value;

                                                    items[index].quantity =
                                                        raw === ""
                                                            ? null
                                                            : parseInt(raw, 10);

                                                    setData("items", items);
                                                }}
                                            />
                                        </TableCell>
                                        {data.items.length > 1 && (
                                            <TableCell>
                                                <Button
                                                    variant="destructive"
                                                    type="button"
                                                    onClick={() =>
                                                        removeRow(index)
                                                    }
                                                >
                                                    X
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button
                            className="mt-4 bg-green-600 text-white hover:bg-green-700"
                            type="button"
                            onClick={addRow}
                        >
                            Add Row
                        </Button>
                    </div>
                    <div className="w-1/4">
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Notes</FieldLabel>
                                    <Textarea
                                        onChange={(e) =>
                                            setData("notes", e.target.value)
                                        }
                                    />
                                </Field>
                                <Field>
                                    <Button
                                        type="submit"
                                        className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600"
                                    >
                                        Submit
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
