import {useCallback, useState} from "react";
import {Legends} from "./legends";

export const useLegendStore = (): [Legends.LegendStore, Legends.LegendDispatcher] => {
  const [legendStore, setLegendStore] = useState<Legends.LegendStore>({});
  
  const legendDispatcher: Legends.LegendDispatcher = useCallback(
      <T extends Legends.LegendMode>(registerAction: Legends.LegendRegisterAction<T>): void => {
        setLegendStore(legendStore => {
          if(JSON.stringify(legendStore[registerAction.id]) === JSON.stringify(registerAction)) return legendStore;
          legendStore[registerAction.id] = registerAction;
          return {...legendStore};
        });
      }, []);
  
  return [legendStore, legendDispatcher];
};






