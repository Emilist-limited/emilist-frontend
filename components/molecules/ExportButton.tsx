import * as XLSX from "xlsx";

import { Table, RowSelectionState, Row, Cell } from "@tanstack/react-table";

interface ExportButtonProps<TData = any> {
  table: Table<TData>;
  rowSelection: RowSelectionState;
}

const ExportButton = <TData,>({
  table,
  rowSelection,
}: ExportButtonProps<TData>) => {
  const exportToExcel = (): void => {
    const selectedRows: Row<TData>[] = table.getFilteredSelectedRowModel().rows;
    const rowsToExport: Row<TData>[] =
      selectedRows?.length > 0 ? selectedRows : table.getRowModel().rows;

    // Extract data for export (excluding actions column)
    const exportData: Record<string, any>[] = rowsToExport.map(
      (row: Row<TData>) => {
        const rowData: Record<string, any> = {};
        row.getVisibleCells().forEach((cell: Cell<TData, unknown>) => {
          // Skip the actions column and selection column
          if (cell.column.id !== "actions" && cell.column.id !== "select") {
            const columnDef = cell.column.columnDef;
            const header: string =
              typeof columnDef.header === "string"
                ? columnDef.header
                : ("accessorKey" in columnDef
                    ? (columnDef.accessorKey as string)
                    : null) || cell.column.id;

            // Get the raw value instead of the rendered cell
            rowData[header] = row.getValue(cell.column.id);
          }
        });
        return rowData;
      }
    );

    // Create workbook and worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    // Generate filename with timestamp
    const timestamp: string = new Date().toISOString().split("T")[0];
    const filename: string = `data_export_${timestamp}.xlsx`;

    // Save the file
    XLSX.writeFile(wb, filename);
  };

  const selectedRowCount: number = Object.keys(rowSelection)?.length;
  const totalRowCount: number = table.getRowModel().rows?.length;

  return (
    <div className="flex items-center gap-6 max-md:hidden">
      {/* Selection info and export button */}
      {selectedRowCount > 0 && (
        <div className="flex items-center gap-6">
          <span>|</span>
          <div className="flex items-center gap-2">
            <span className="text-sm dark:text-gray-300 text-gray-600">
              {selectedRowCount} of {totalRowCount} row(s) selected
            </span>
            <button
              className="text-black text-sm flex-c gap-2"
              onClick={exportToExcel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>

              <span>Export Selected</span>
            </button>
          </div>
        </div>
      )}{" "}
      |{/* Export all button */}
      <button
        className="text-black text-sm flex-c gap-2"
        onClick={exportToExcel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>

        <span>Export All</span>
      </button>
    </div>
  );
};

export default ExportButton;
