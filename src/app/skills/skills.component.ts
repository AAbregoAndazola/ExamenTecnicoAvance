import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { MetricsComponent } from '../metrics/metrics.component';

declare var particlesJS: any; 
interface SkillNode {
  name: string;
  children?: SkillNode[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MetricsComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit, OnInit {
  skillsList = [
    { name: 'Ética', description: 'Estudio de los principios morales que guían el comportamiento humano.' },
    { name: 'Lógica', description: 'Análisis del razonamiento y la estructura del pensamiento.' },
    { name: 'Metafísica', description: 'Investigación de la naturaleza fundamental de la realidad y la existencia.' }
  ];

  ngAfterViewInit(): void {
    particlesJS.load('particles-js', 'src/assets/particles.js-master/particles.js', function() {
      console.log('particles.js loaded - callback');
    });
  }

  ngOnInit(): void {
    this.createTreeDiagram();
  }

  createTreeDiagram(): void {
    const data: SkillNode = {
      name: 'Árbol de Conceptos Filosóficos',
      children: [
        {
          name: 'Ramas Principales',
          children: [
            { name: 'Ética' },
            { name: 'Lógica' },
            { name: 'Metafísica' }
          ]
        },
        {
          name: 'Corrientes Filosóficas',
          children: [
            { name: 'Existencialismo' },
            { name: 'Racionalismo' },
            { name: 'Empirismo' }
          ]
        },
        {
          name: 'Áreas de Estudio',
          children: [
            { name: 'Estética' },
            { name: 'Epistemología' },
            { name: 'Filosofía Política' }
          ]
        }
      ]
    };

    const width = 1000; 
    const height = 800; 

    const svg = d3.select('#tree-diagram')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const root = d3.hierarchy<SkillNode>(data);
    const treeLayout = d3.tree<SkillNode>().size([width - 200, height - 350]);
    treeLayout(root);

    root.x = width / 2; 
    root.y = 50; 


    svg.selectAll('line')
      .data(root.links())
      .enter()
      .append('line')
      .attr('x1', d => d.source.x ?? 0)
      .attr('y1', d => d.source.y ?? 0)
      .attr('x2', d => d.target.x ?? 0)
      .attr('y2', d => d.target.y ?? 0)
      .attr('stroke', '#ccc');

    svg.selectAll('circle')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('cx', d => (d.x ?? 0) + this.getRandomOffset()) 
      .attr('cy', d => (d.y ?? 0) + this.getRandomOffset())
      .attr('r', 5)
      .attr('fill', '#8a2be2');

    svg.selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('x', d => (d.x ?? 0) + 10 + this.getRandomOffset()) 
      .attr('y', d => (d.y ?? 0) + this.getRandomOffset())
      .text(d => d.data.name)
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .style('text-anchor', 'start');
}

getRandomOffset(): number {
    return Math.floor(Math.random() * 50) - 10; 
}


}