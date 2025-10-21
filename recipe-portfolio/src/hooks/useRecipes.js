import { useCallback } from 'react';

const STORAGE_KEY = 'rp_demo_recipes_v1';

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function useRecipes() {
  const listRecipes = useCallback(async () => {
    return readAll();
  }, []);

  const getRecipe = useCallback(async (id) => {
    const list = readAll();
    const found = list.find((r) => String(r.id) === String(id) || String(r._id) === String(id));
    if (!found) throw new Error('Recipe not found');
    return found;
  }, []);

  const createRecipe = useCallback(async (data) => {
    const list = readAll();
    const id = Date.now().toString();
    const record = { ...data, id };
    list.unshift(record);
    writeAll(list);
    return record;
  }, []);

  const updateRecipe = useCallback(async (id, data) => {
    const list = readAll();
    const idx = list.findIndex((r) => String(r.id) === String(id) || String(r._id) === String(id));
    if (idx === -1) throw new Error('Recipe not found');
    list[idx] = { ...list[idx], ...data };
    writeAll(list);
    return list[idx];
  }, []);

  const deleteRecipe = useCallback(async (id) => {
    const list = readAll();
    const idx = list.findIndex((r) => String(r.id) === String(id) || String(r._id) === String(id));
    if (idx === -1) throw new Error('Recipe not found');
    const [removed] = list.splice(idx, 1);
    writeAll(list);
    return removed;
  }, []);

  return { listRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe };
}
