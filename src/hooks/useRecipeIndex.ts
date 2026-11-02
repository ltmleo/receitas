import {usePluginData} from '@docusaurus/useGlobalData';
import type {RecipeIndexData} from '@site/plugins/recipe-index';

export default function useRecipeIndex(): RecipeIndexData {
  return usePluginData('recipe-index') as RecipeIndexData;
}
