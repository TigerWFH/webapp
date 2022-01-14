import { of, fromEvent } from 'rxjs';
import { map, scan, throttleTime } from 'rxjs/operators';

of(1, 2, 3).pipe(map((x) => x + '!!!'));

// fromEvent(document, 'click').subscribe(() => console.log('Clicked'));
fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(`Clicked ${count} times`));
