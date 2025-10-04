<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

class MasterTransformer extends TransformerAbstract{
    public function transform($item){
        $result = [];
        foreach($item as $key => $value){
            $result[$key] = $value;
        }

        return $result;
    }
}
