import { Pipe } from "@angular/core";


@Pipe({
    name: 'reduceWhitespace',
})
class ReduceWhitespacePipe {
    transform(event: Event, data: any, id: string) {
        const rawValue = data[id];
        const update = Object.assign({}, data);

        update[id] = rawValue.replace(/  +/g, ' ').trim();

        return update;
    }
}

export default ReduceWhitespacePipe;