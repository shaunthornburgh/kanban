<?php

namespace App\GraphQL\Mutations;

use App\Models\Card;

class CardUpdatePlacement
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $card = Card::where('id', $args['id'])->first();

//        if ($card->list_id === $args['list_id']) {
//            foreach ($card->list->cards as $currentCard) {
//                if ($currentCard->order >= $card->order) {
//                    $currentCard->order = $currentCard->order + 1;
//                    $currentCard->save();
//                }
//            }
//        }

        $card->list_id = $args['list'];
        $card->order = $args['order'];
        $card->save();

        return $card;
    }
}
