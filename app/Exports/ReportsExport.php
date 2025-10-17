<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class ReportsExport implements FromCollection, WithMapping, WithHeadings, ShouldAutoSize, WithStyles
{
    use Exportable;

    public $values;

    public function __construct(Collection $values)
    {
        $this->report = $values;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->report;
    }

    public function headings(): array
    {
        return [
            'Name',
            'Status',
            'Project',
            'Priority',
            'Assigned',
            'Due Date',
            'Date Created',
        ];
    }

    public function map($value): array
    {
        return [
            $value->name,
            $value->status,
            $value->project?->name,
            $value->priority,
            $value->assigned?->name,
            $value->end_date,
            $value->created_at,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
