import { DashboardFilters } from "../../DataTypes/DashboardFilters";
import { MagicCardItem } from "../../DataTypes/MagicCardItem";

export async function fetchCardsAfterFilterAsync(filters: DashboardFilters) : Promise<MagicCardItem[]>{
    // This URL is case sensitive - changing "pageSize" to "pagesize" will return data with default page size
    return await fetch(`https://api.magicthegathering.io/v1/cards?pageSize=${filters.pageSize}`)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(result => {
        if(result){
            return result.cards;
        }
        return [];
    })
    .catch(error => console.error(error));
}