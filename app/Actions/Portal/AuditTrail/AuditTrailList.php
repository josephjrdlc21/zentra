<?php

namespace App\Actions\Portal\AuditTrail;

use App\Models\AuditTrail;

class AuditTrailList{
    private array $data = [];
    private ?int $per_page;

    public function __construct(array $data = [], ?int $per_page = null) {
        $this->data = $data;
        $this->per_page = $per_page;
    }

    public function execute(): array {
        $record = AuditTrail::with('user')->when(strlen($this->data['keyword']) > 0, function ($query) {
            $query->whereRaw("LOWER(remarks) LIKE '%{$this->data['keyword']}%'");
        })
        ->latest()
        ->paginate($this->per_page);

        return ['record' => $record];
    }
}