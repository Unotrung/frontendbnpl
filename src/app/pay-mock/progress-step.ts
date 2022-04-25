import {Observable} from "rxjs";

export interface ProgressStep {
    id: number,
    title: Observable<string>
}
