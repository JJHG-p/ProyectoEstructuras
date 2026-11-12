import { Injectable, OnDestroy, signal } from "@angular/core";
import { ref, onValue, push, set, update, remove } from "firebase/database";
import { db } from "../firebase.config";

@Injectable()
export class RealtimeCollectionService<T> implements OnDestroy {
    results = signal<T[]>([]);
    isPending = signal<boolean>(true);
    error = signal<string | null>(null);

    private path = '';
    private unsubscribe: (() => void) | null = null;

    init(path: string) {
        this.path = path;
        this.startListener();
        return this;
    }

    private handleSnapshot(snapshot: any) {
        const data = snapshot.val();
        const lista: T[] = [];

        if (data) {
            for (const id of Object.keys(data)) {
                lista.push({ ...data[id], id } as T);
            }
        }

        this.results.set(lista);
        this.isPending.set(false);
    }

    private startListener() {
        this.unsubscribe = onValue(
            ref(db, this.path),
            (snapshot) => this.handleSnapshot(snapshot),
            (err) => {
                this.error.set(err.message);
                this.isPending.set(false);
            }
        );
    }

    getAll() {
        return this.results();
    }

    async add(item: T) {
        try {
            await set(push(ref(db, this.path)), item);
        } catch (err: any) {
            this.error.set(err.message);
            throw err;
        }
    }

    async update(id: string, cambios: Partial<T>){
        try {
            await update(ref(db, `${this.path}/${id}`), Object.assign({}, cambios));
        } catch (err: any) {
            this.error.set(err.message);
            throw err;
        }
    }

    async deleteItem(id: string) {
        try {
            await remove(ref(db, `${this.path}/${id}`));
        } catch (err: any) {
            this.error.set(err.message);
            throw err;
        }
    }

    ngOnDestroy() {
        if (this.unsubscribe){
            this.unsubscribe();
        }
    }
}