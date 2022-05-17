"use strict";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class NgMaterialModule { }
