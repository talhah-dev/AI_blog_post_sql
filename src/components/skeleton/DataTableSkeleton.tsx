import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function DataTableSkeleton() {
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
                <div className="h-5 w-28 rounded bg-muted-foreground/20 animate-pulse" />
                <div className="h-8 w-28 rounded-md bg-muted-foreground/20 animate-pulse" />
            </div>

            <div className="px-4 lg:px-6">
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted">
                            <TableRow>
                                {["Title", "Content", "Status", "Published At", ""].map((header) => (
                                    <TableHead key={header}>
                                        <div className="h-4 w-20 rounded bg-muted-foreground/20 animate-pulse" />
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-md bg-muted-foreground/20 animate-pulse" />
                                            <div className="h-4 w-32 rounded bg-muted-foreground/20 animate-pulse" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 w-48 rounded bg-muted-foreground/20 animate-pulse" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-5 w-20 rounded-full bg-muted-foreground/20 animate-pulse" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 w-24 rounded bg-muted-foreground/20 animate-pulse" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="size-8 rounded bg-muted-foreground/20 animate-pulse" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}