You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## 1. Project Overview
Display Droplet Count in a Plate Grid and allow users to view which cells in the grid have
a low dropled count. Also show a summary of the total well count, and total low droplet
well count. Allow user to enter a threshold number that determines whether droplet count
is low or not.

Problem Statement
You are given a 48-well or 96-well plate, where each well contains a droplet count. Build an
Angular application that loads a JSON file and displays these wells in a grid, highlighting
low-droplet wells and allowing the user to adjust the droplet threshold.

The UI should include:
• A plate grid (8×12 or 8×6)
• A summary of total wells and low-droplet wells
• A threshold input with Update
• A small legend (n = normal, L = low)

Example layout:
1 2 3 4 5 6 7 8 9 10 11 12
A n n n n L L n L n n n n
B n n n n n L L n n L n n
...
H n L n n n n n n n L L n

Low wells (L) should be visually distinguished (e.g., gray background).

Data Inputs
(PlateDropletInfo.json or PlateDropletsInfo_48Wells.json.)
- Plate droplets info file: A JSON file containing well indices and their droplet
counts.
- 96-well plate: An 8×12 layout with indices 0–95 (A1 = 0 through H12 = 95).
- 48-well plate: An 8×6 layout with indices 0–47 (A1 = 0 through H6 = 47).
- Droplet count: An integer between 0 and 500.

# 2. Goal 
Build the necessary components, models, and services for an Angular v21 web application.

Success measurements:
1. Displays the required UI Includes the grid, summary, threshold input, and legend.
2. Allows the user to load a JSON file Provide a file upload control and parse the
JSON in the browser (no backend).
3. Adjusts layout based on plate size Detect 48-well vs 96-well from the data and
render the grid accordingly.
4. Uses a default threshold of 100 Display 100 on first load.
5. Classifies each well Show:
o L if droplet count < threshold
o n if droplet count ≥ threshold
6. Visually indicates low wells Change background color for L wells.
7. Allows threshold editing Accept values 0–500. When Update is clicked,
recalculate grid and summary. 

# 3. Guidelines
1. Angular SPA implementation Clean Angular CLI project with clear component
structure (e.g., PlateGridComponent, SummaryComponent).
2. Readable, typed TypeScript Interfaces for wells/plate data; modular, maintainable
code.
3. Production readiness Good error handling, clear labels, sensible UX behaviors.
4. Angular best practices Use DI for services, logical component boundaries, and
appropriate forms (Reactive or well-structured template-driven).
5. Reasonable use of dependencies Angular Material/Bootstrap allowed but
optional.
6. Sound Angular architecture Demonstrate understanding of inputs/outputs, data
flow, change detection, and simple state management.
7. Testing awareness Show familiarity with unit testing concepts (Jasmine/Karma),
even if coverage is minimal. Tests for the Angular service classes take priority.


JSON data files to be read in using Angular HttpClient fetch.

# 4. Tasks
## 1. Implement plate-data.service.ts class that loads the json files when it
is selected by the user. The use will be using a file input element and therefore
the service method should parse the json from the File object input parameter.
This task also involes parsing the json into models located in the `src/app/features/droplets/models
directory. This method should be called loadPlateData.
The service should hold the plate data in memory and make it available via a
method called `getPlateData()` that returns an instance of the PlateDropletInfo model class.
this task also includes creating a component in the `src/shared/components` directory
that will be in its own folder called file-upload and will have a label and input element
of type file that accepts only one json file at a time. This component will call to the
plate-data.service.ts class and pass the file object to the loadPlateData method.

## 2. Implement unit tests for the plate-data.service.ts
The tests should be in a *.spec.ts file next to the plate-data.service.ts file.
Use the jasmine test framework for the tests.
Test only the public methods.

## 3. Build the plate grid component
The component should go into the existing files in the `src/app/features/droplets/components/plate`
The html template should use css display grid to layout the plate's visual grid.
Columns should have labels at top of column that are the number of the column starting with 1 and going left to right
Rows should have labels at beginning of row that are Alphabetical starting with A and going top to bottom.
Each cell in the grid will correspond to an instance of the Well model type. the cell should contain the
value of the Well.DropletCount property.
The wells collection should be acquired by the component using the plate-data.service.ts method called `getPlataData` and should be sorted by the Well.WellIndex number value.
The wells should then be laid out in the grid starting with WellIndex:1 going in cell A1, then continuing
left to right for each row.
The grid should have a number of columns equal to the length of the array DropletInfo.Wells divided by 8.
So the grid will have 8 rows labeled A,B,C,D,E,F,G, and H always.  
Each well model also has a property called DropletCount that will be shown and will determin the background
color of the cell based on whether it is L (low, below a threshold number) or N (normal).


# 5. Best Practices 
## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
