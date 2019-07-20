export interface CRUD{
    create(name: string);
    read();
    update(idItem, editedName);
    delete(idItem: string);
}