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
        [disabled]="disableButton()"
        (click)="minusNumber()"
        class="btn btn-primary"
      >
        -
      </button>
      <span data-testid="fizzbuzz">{{ store.current() }}</span>
      <button (click)="addNumber()" class="btn btn-primary">+</button>

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
  currentCounter = signal(0); // state
  disableButton = computed(() => this.currentCounter() == 0);
  counterChanged = output<number>();

  addNumber() {
    this.currentCounter.update((c) => c + 1);

    this.counterChanged.emit(this.currentCounter());
  }

  minusNumber() {
    this.currentCounter.update((c) => c - 1);

    this.counterChanged.emit(this.currentCounter());
  }

  fizzBuzzMessage = computed(() => {
    const counter = this.currentCounter();
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
