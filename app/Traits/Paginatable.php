<?php

namespace App\Traits;

trait Paginatable
{
    protected $perPageMax = 1000;

    /**
     * Get the number of models to return per page.
     *
     * @return int
     */
    public function getPerPage(): int
    {
        
        $per_page = request('per_page');
        $limit = request('limit');

        
        $perPage = $this->perPage;
        if($per_page){
            $perPage = $per_page;
        }elseif($limit){
            $perPage = $limit;
        }

        
        if ($perPage === 'all' || $limit == 'false') {
            $perPage = $this->count();
        }
       
        return max(1, min($this->perPageMax, (int) $perPage));       
    }

    /**
     * @param int $perPageMax
     */
    public function setPerPageMax(int $perPageMax): void
    {
        $this->perPageMax = $perPageMax;
    }
}