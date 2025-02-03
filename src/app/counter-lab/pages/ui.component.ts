import {
  Component,
  ChangeDetectionStrategy,
  signal,
  output,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-counter-lab-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.disableButton()"
        (click)="store.minusNumber()"
        class="btn btn-primary"
      >
        -
      </button>
      <span data-testid="fizzbuzz">{{ store.current() }}</span>
      <button (click)="store.addNumber()" class="btn btn-primary">+</button>

      @if (fizzBuzzMessage() !== '') {
        <div class="alert alert-info">
          @switch (fizzBuzzMessage()) {
            @case ('fizz') {
              <p>Fizz!</p>
            }
            @case ('buzz') {
              <p>Buzz!</p>
            }
            @case ('fizzbuzz') {
              <p>FizzBuzz!</p>
            }
          }
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);

  fizzBuzzMessage = computed(() => {
    const counter = this.store.current();
    const fizzNumber = 3;
    const buzzNumber = 5;

    if (
      counter > 0 &&
      counter % fizzNumber === 0 &&
      counter % buzzNumber === 0
    ) {
      return 'fizzbuzz';
    }
    if (counter > 0 && counter % fizzNumber === 0) {
      return 'fizz';
    }
    if (counter > 0 && counter % buzzNumber === 0) {
      return 'buzz';
    }
    return '';
  });
}
