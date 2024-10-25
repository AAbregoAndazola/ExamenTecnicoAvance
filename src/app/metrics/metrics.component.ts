import { Component } from '@angular/core';

@Component({
  selector: 'app-metrics',
  standalone: true,
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})

export class MetricsComponent {
  studentsCount = 0;
  booksCount = 0;
  yearsCount = 0;
  conceptsCount = 0;

  private targets = {
    students: 150000,
    books: 250000,
    years: 2400,
    concepts: 5000
  };

  ngOnInit(): void {
    this.animateCounts();
  }

  animateCounts() {
    const duration = 10000; 
    const steps = 50;
    const interval = duration / steps;

    const incrementValues = {
      students: this.targets.students / steps,
      books: this.targets.books / steps,
      years: this.targets.years / steps,
      concepts: this.targets.concepts / steps
    };

    const intervalId = setInterval(() => {
      let completed = true;

      if (this.studentsCount < this.targets.students) {
        this.studentsCount += incrementValues.students;
        completed = false;
      }

      if (this.booksCount < this.targets.books) {
        this.booksCount += incrementValues.books;
        completed = false;
      }

      if (this.yearsCount < this.targets.years) {
        this.yearsCount += incrementValues.years;
        completed = false;
      }

      if (this.conceptsCount < this.targets.concepts) {
        this.conceptsCount += incrementValues.concepts;
        completed = false;
      }

      if (completed) {
        clearInterval(intervalId);
      }
    }, interval);
  }
}
