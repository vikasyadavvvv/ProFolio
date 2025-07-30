const KEY = 'profiles';

export function loadProfiles(){
  try{
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    return [];
  }
}

export function saveProfiles(list){
  localStorage.setItem(KEY, JSON.stringify(list));
}
