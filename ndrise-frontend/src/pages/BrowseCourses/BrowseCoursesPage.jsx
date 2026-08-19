import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/Motion/MotionUtils';
import { 
  Search, Code, BarChart2, Smartphone, Shield, Layout, 
  Database, Cloud, Clock, CheckCircle2, XCircle, ArrowRight, 
  ArrowLeft, RotateCcw, Award, Sparkles, HelpCircle, Check
} from 'lucide-react';
import './BrowseCoursesPage.css';

export const ALL_COURSES = [
  {
    id: 'web-dev-cert',
    title: 'Web Development',
    category: 'DEVELOPMENT',
    level: 'BEGINNER',
    levelType: 'beginner',
    iconType: 'code',
    iconColor: '#2563eb',
    iconBg: '#eff6ff',
    description: 'Build and test your skills in HTML5, CSS3, JavaScript ES6+, React, and modern web architecture.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which HTML5 element is used to specify the main content area of a webpage document?',
        options: ['<main>', '<content>', '<header>', '<section>'],
        correct: 0,
        explanation: 'The <main> tag specifies the main, central content of a document that is unique to that page.'
      },
      {
        id: 2,
        question: 'Which CSS property controls the internal spacing between an element content and its border?',
        options: ['margin', 'padding', 'border-spacing', 'gap'],
        correct: 1,
        explanation: 'Padding creates space inside an element container, while margin creates space outside the element border.'
      },
      {
        id: 3,
        question: 'What is the correct HTML syntax for linking an external JavaScript file called "script.js"?',
        options: ['<script href="script.js">', '<script src="script.js">', '<script name="script.js">', '<script link="script.js">'],
        correct: 1,
        explanation: 'The src (source) attribute inside the <script> element specifies the URL of an external script file.'
      },
      {
        id: 4,
        question: 'Which CSS Flexbox property aligns items along the primary main axis?',
        options: ['align-items', 'justify-content', 'align-content', 'flex-direction'],
        correct: 1,
        explanation: 'justify-content aligns flex items along the main axis, while align-items aligns items along the cross axis.'
      },
      {
        id: 5,
        question: 'Which attribute provides alternate text for screen readers and broken image links in HTML?',
        options: ['title', 'alt', 'caption', 'desc'],
        correct: 1,
        explanation: 'The alt attribute specifies an alternate text for an image if the image cannot be displayed.'
      },
      {
        id: 6,
        question: 'What type of object does the JavaScript fetch() API return?',
        options: ['JSON Object', 'Promise', 'XML Document', 'Stream'],
        correct: 1,
        explanation: 'fetch() is an asynchronous Web API method that returns a Promise resolving to a Response object.'
      },
      {
        id: 7,
        question: 'Which browser storage mechanism persists key-value data even after closing the browser tab?',
        options: ['sessionStorage', 'localStorage', 'Cookies', 'IndexedDB Memory'],
        correct: 1,
        explanation: 'localStorage stores data with no expiration time, whereas sessionStorage data is cleared when the tab closes.'
      },
      {
        id: 8,
        question: 'What is the difference between CSS "display: none" and "visibility: hidden"?',
        options: [
          '"display: none" removes element from layout flow; "visibility: hidden" keeps space allocated',
          '"visibility: hidden" removes element from layout flow; "display: none" keeps space',
          'Both behave identically',
          '"display: none" only works on block elements'
        ],
        correct: 0,
        explanation: 'display: none hides the element completely without reserving space, while visibility: hidden hides it but retains its layout box.'
      },
      {
        id: 9,
        question: 'In React, which hook is used to declare state variables in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correct: 1,
        explanation: 'useState is the primary React Hook that allows functional components to hold and manage local state.'
      },
      {
        id: 10,
        question: 'Which box-sizing rule ensures border and padding dimensions are included in the element total width?',
        options: ['content-box', 'border-box', 'padding-box', 'margin-box'],
        correct: 1,
        explanation: 'box-sizing: border-box includes padding and border within the element specified width and height.'
      },
      {
        id: 11,
        question: 'Which HTML5 semantic element represents a major section of navigation links?',
        options: ['<menu>', '<nav>', '<header>', '<aside>'],
        correct: 1,
        explanation: 'The <nav> HTML element represents a section of a page intended for navigation links.'
      },
      {
        id: 12,
        question: 'Which CSS property determines the stacking order of positioned overlapping elements?',
        options: ['order', 'z-index', 'position', 'stack-order'],
        correct: 1,
        explanation: 'z-index specifies the z-order of a positioned element and its descendants.'
      },
      {
        id: 13,
        question: 'In DOM event flow, what is the default direction of Event Bubbling?',
        options: ['From document root down to target', 'From target element up to document root', 'Random order', 'Parallel dispatch'],
        correct: 1,
        explanation: 'Event bubbling triggers handlers on the innermost target element first, then bubbles up through parent nodes.'
      },
      {
        id: 14,
        question: 'Which React Hook handles side effects such as data fetching, subscriptions, or DOM mutations?',
        options: ['useMemo', 'useCallback', 'useEffect', 'useRef'],
        correct: 2,
        explanation: 'useEffect tells React that component needs to execute a side effect after rendering.'
      },
      {
        id: 15,
        question: 'What is the CSS rem unit relative to?',
        options: ['Parent element font-size', 'Root <html> element font-size', 'Viewport height', 'Container width'],
        correct: 1,
        explanation: 'rem stands for "root em" and is relative to the font-size of the root <html> element (usually 16px by default).'
      }
    ]
  },
  {
    id: 'python-cert',
    title: 'Python Programming',
    category: 'PROGRAMMING',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'code',
    iconColor: '#d97706',
    iconBg: '#fffbe6',
    description: 'Evaluate your knowledge of Python fundamentals, data structures, OOP, decorators, and logic building.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'What is the data type returned by type([1, 2, 3]) in Python?',
        options: ['tuple', 'list', 'set', 'dict'],
        correct: 1,
        explanation: 'Square brackets [] declare a mutable Python list object.'
      },
      {
        id: 2,
        question: 'Which keyword is used to define a function in Python?',
        options: ['func', 'def', 'function', 'create'],
        correct: 1,
        explanation: 'The def keyword introduces a function definition in Python.'
      },
      {
        id: 3,
        question: 'How do you create single-line comments in Python?',
        options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
        correct: 2,
        explanation: 'Python uses the hash character # to begin a single-line comment.'
      },
      {
        id: 4,
        question: 'Which built-in Python function returns the total length or number of items in a container?',
        options: ['length()', 'count()', 'len()', 'size()'],
        correct: 2,
        explanation: 'len() returns the number of items in an object like a list, string, or dictionary.'
      },
      {
        id: 5,
        question: 'Which of the following Python data structures is immutable?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correct: 2,
        explanation: 'Tuples are immutable sequences of Python objects; their elements cannot be changed once assigned.'
      },
      {
        id: 6,
        question: 'Which Python list method removes and returns the item at a specified index (default last)?',
        options: ['remove()', 'pop()', 'delete()', 'extract()'],
        correct: 1,
        explanation: 'pop([i]) removes the item at the given position in the list, and returns it.'
      },
      {
        id: 7,
        question: 'What keyword is used to handle exceptions in a try block?',
        options: ['catch', 'except', 'error', 'handle'],
        correct: 1,
        explanation: 'Python uses try and except statements to handle runtime exceptions.'
      },
      {
        id: 8,
        question: 'What does the list comprehension syntax [x**2 for x in range(3)] evaluate to?',
        options: ['[1, 2, 3]', '[0, 1, 4]', '[0, 1, 2]', '[1, 4, 9]'],
        correct: 1,
        explanation: 'range(3) produces 0, 1, 2. Squaring each yields [0, 1, 4].'
      },
      {
        id: 9,
        question: 'Which keyword is used to create an anonymous function in Python?',
        options: ['anonymous', 'lambda', 'def', 'inline'],
        correct: 1,
        explanation: 'Small anonymous functions can be created with the lambda keyword.'
      },
      {
        id: 10,
        question: 'What is the special constructor method name inside Python OOP classes?',
        options: ['__construct__', '__init__', 'new()', '__main__'],
        correct: 1,
        explanation: '__init__ is the initializer method automatically invoked when instantiating a new class object.'
      },
      {
        id: 11,
        question: 'Which argument parameter passes an arbitrary number of keyword arguments to a Python function?',
        options: ['*args', '**kwargs', '*items', '...params'],
        correct: 1,
        explanation: '**kwargs allows a function to accept any number of keyword arguments as a dictionary.'
      },
      {
        id: 12,
        question: 'What operator tests whether two variables point to the exact same object memory location?',
        options: ['==', 'is', 'equals()', 'in'],
        correct: 1,
        explanation: 'The is operator evaluates to True if two variables point to the exact same object in memory.'
      },
      {
        id: 13,
        question: 'Which built-in module provides functions to interact with the underlying operating system in Python?',
        options: ['sys', 'os', 'path', 'env'],
        correct: 1,
        explanation: 'The os module provides a portable way of using operating system dependent functionality.'
      },
      {
        id: 14,
        question: 'What does a Python decorator function do?',
        options: [
          'Deletes unused variables',
          'Wraps and modifies or enhances another function behavior without changing source code',
          'Formats terminal output with colors',
          'Compiles code to C extension'
        ],
        correct: 1,
        explanation: 'A decorator is a function that takes another function as an argument and extends its behavior dynamically.'
      },
      {
        id: 15,
        question: 'Which statement immediately exits the current enclosing loop in Python?',
        options: ['continue', 'break', 'return', 'stop'],
        correct: 1,
        explanation: 'The break statement terminates the loop containing it.'
      }
    ]
  },
  {
    id: 'java-cert',
    title: 'Java Programming',
    category: 'PROGRAMMING',
    level: 'ADVANCED',
    levelType: 'advanced',
    iconType: 'code',
    iconColor: '#dc2626',
    iconBg: '#fef2f2',
    description: 'Assess your understanding of Java OOP, classes, interfaces, memory model, threads, and collections.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which Java keyword is used by a class to inherit from a superclass?',
        options: ['implements', 'extends', 'inherits', 'super'],
        correct: 1,
        explanation: 'The extends keyword is used to derive a class from a base class in Java.'
      },
      {
        id: 2,
        question: 'Which access modifier makes a class member accessible ONLY within its defining class?',
        options: ['public', 'protected', 'private', 'package-private'],
        correct: 2,
        explanation: 'private members are accessible only within the class where they are declared.'
      },
      {
        id: 3,
        question: 'What is the correct signature of the main entry point method in Java?',
        options: [
          'public void main(String[] args)',
          'public static void main(String[] args)',
          'static void main()',
          'public int main(String args)'
        ],
        correct: 1,
        explanation: 'Java Virtual Machine (JVM) looks for public static void main(String[] args) to start execution.'
      },
      {
        id: 4,
        question: 'Which modifier prevents a class from being subclassed or a method from being overridden?',
        options: ['static', 'final', 'abstract', 'const'],
        correct: 1,
        explanation: 'The final keyword prevents class inheritance, method overriding, and variable reassignment.'
      },
      {
        id: 5,
        question: 'Which interface keyword allows a Java class to promise implementation of abstract methods?',
        options: ['extends', 'implements', 'interface', 'abstract'],
        correct: 1,
        explanation: 'Classes use implements to fulfill contracts defined by Java interfaces.'
      },
      {
        id: 6,
        question: 'What manages automatic memory deallocation of unused objects in Java?',
        options: ['Destructor', 'Garbage Collector', 'Memory Manager', 'JVM Cleaner'],
        correct: 1,
        explanation: 'The Garbage Collector automatically reclaims memory occupied by unreachable objects.'
      },
      {
        id: 7,
        question: 'Which Collection implementation maintains insertion order and allows duplicate elements?',
        options: ['HashSet', 'TreeSet', 'ArrayList', 'HashMap'],
        correct: 2,
        explanation: 'ArrayList implements a dynamic resizable array that maintains insertion order and permits duplicates.'
      },
      {
        id: 8,
        question: 'What exception is thrown when attempting to dereference an uninitialized object variable?',
        options: ['ClassCastException', 'NullPointerException', 'IllegalArgumentException', 'ArrayIndexOutOfBoundsException'],
        correct: 1,
        explanation: 'NullPointerException (NPE) is thrown when calling methods or accessing fields on a null reference.'
      },
      {
        id: 9,
        question: 'Which keyword calls the superclass constructor from inside a child class constructor?',
        options: ['this()', 'super()', 'base()', 'parent()'],
        correct: 1,
        explanation: 'super() invokes the constructor of the parent superclass.'
      },
      {
        id: 10,
        question: 'Are String objects in Java mutable or immutable?',
        options: ['Mutable', 'Immutable', 'Depends on JVM version', 'Mutable inside main method only'],
        correct: 1,
        explanation: 'Strings are immutable in Java; any modification creates a new String instance in the String Pool.'
      },
      {
        id: 11,
        question: 'Which Map interface implementation stores key-value pairs using a hash table?',
        options: ['TreeMap', 'HashMap', 'LinkedHashMap', 'ConcurrentSkipListMap'],
        correct: 1,
        explanation: 'HashMap provides O(1) constant-time performance for basic get and put operations.'
      },
      {
        id: 12,
        question: 'What is the term for declaring multiple methods with the same name but different parameters in the same class?',
        options: ['Method Overriding', 'Method Overloading', 'Polymorphic Shadowing', 'Encapsulation'],
        correct: 1,
        explanation: 'Method Overloading allows multiple methods in the same class to share the same name with different signatures.'
      },
      {
        id: 13,
        question: 'What wrapper class corresponds to the primitive type int in Java?',
        options: ['Int', 'Integer', 'Number', 'IntWrapper'],
        correct: 1,
        explanation: 'Integer is the object wrapper class for the primitive int type in Java.'
      },
      {
        id: 14,
        question: 'Which keyword enforces thread synchronization on a method or code block in Java?',
        options: ['volatile', 'synchronized', 'lock', 'atomic'],
        correct: 1,
        explanation: 'synchronized prevents concurrent access to a block or method by multiple threads.'
      },
      {
        id: 15,
        question: 'Which block in a try-catch structure executes regardless of whether an exception occurred or not?',
        options: ['catch', 'finally', 'then', 'always'],
        correct: 1,
        explanation: 'The finally block always executes when the try block exits, ensuring resource cleanup.'
      }
    ]
  },
  {
    id: 'c-cert',
    title: 'C Programming',
    category: 'PROGRAMMING',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'code',
    iconColor: '#2563eb',
    iconBg: '#eff6ff',
    description: 'Test your core programming skills including memory management, pointers, and logic building in C.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which unary operator returns the memory address of a variable in C?',
        options: ['*', '&', '->', '%'],
        correct: 1,
        explanation: 'The address-of operator & retrieves the memory location of a variable.'
      },
      {
        id: 2,
        question: 'Which function allocates uninitialized heap memory dynamically in C?',
        options: ['malloc()', 'calloc()', 'realloc()', 'alloc()'],
        correct: 0,
        explanation: 'malloc() allocates requested bytes of uninitialized memory on the heap.'
      },
      {
        id: 3,
        question: 'What is the size of int data type in standard 64-bit GCC compiler?',
        options: ['2 bytes', '4 bytes', '8 bytes', '1 byte'],
        correct: 1,
        explanation: 'In 64-bit GCC systems, int occupies 4 bytes (32 bits) of memory.'
      },
      {
        id: 4,
        question: 'Which operator is used to dereference a pointer variable to access its pointed value?',
        options: ['&', '*', '->', '.'],
        correct: 1,
        explanation: 'The indirection or dereference operator * accesses the value stored at the pointer memory address.'
      },
      {
        id: 5,
        question: 'What format specifier is used in printf() to output an integer value?',
        options: ['%s', '%f', '%d', '%c'],
        correct: 2,
        explanation: '%d (or %i) is the format specifier for signed decimal integers.'
      },
      {
        id: 6,
        question: 'What character marks the termination of a string array in C?',
        options: ['\\n', '\\0', 'EOF', '\\t'],
        correct: 1,
        explanation: 'Strings in C are null-terminated character arrays ending with the null character \\0.'
      },
      {
        id: 7,
        question: 'Which C standard library function deallocates previously allocated heap memory?',
        options: ['delete()', 'free()', 'dealloc()', 'release()'],
        correct: 1,
        explanation: 'free() releases memory allocated by malloc, calloc, or realloc back to the OS.'
      },
      {
        id: 8,
        question: 'Which keyword creates user-defined composite data types combining variables of different types?',
        options: ['enum', 'struct', 'typedef', 'union'],
        correct: 1,
        explanation: 'struct packages multiple related variables into a single composite type.'
      },
      {
        id: 9,
        question: 'Which standard header file must be included to use printf() and scanf() in C?',
        options: ['<stdlib.h>', '<stdio.h>', '<string.h>', '<conio.h>'],
        correct: 1,
        explanation: '<stdio.h> contains core Standard Input Output stream function declarations.'
      },
      {
        id: 10,
        question: 'What happens if a switch case statement does not end with a break statement?',
        options: ['Syntax Error', 'Execution falls through to subsequent case blocks', 'Loop terminates', 'Program crashes'],
        correct: 1,
        explanation: 'Without break, C execution continues into following cases regardless of case matches.'
      },
      {
        id: 11,
        question: 'What value is held by an uninitialized automatic local variable in C?',
        options: ['0', 'NULL', 'Garbage value', '-1'],
        correct: 2,
        explanation: 'Local uninitialized variables contain indeterminate (garbage) values left in stack memory.'
      },
      {
        id: 12,
        question: 'Which mode string opens an existing file for reading using fopen() in C?',
        options: ['"r"', '"w"', '"a"', '"r+"'],
        correct: 0,
        explanation: '"r" opens a file for input operations; the file must exist.'
      },
      {
        id: 13,
        question: 'Why is a base condition mandatory in a recursive function in C?',
        options: ['To speed up compilation', 'To prevent infinite recursion stack overflow', 'To return zero', 'To allocate heap memory'],
        correct: 1,
        explanation: 'A base case stops recursive calls, preventing infinite recursion that causes stack overflow.'
      },
      {
        id: 14,
        question: 'Which C operator accesses a structure member through a pointer to that structure?',
        options: ['.', '->', '::', '*.'],
        correct: 1,
        explanation: 'The arrow operator -> dereferences the pointer and accesses the structure member.'
      },
      {
        id: 15,
        question: 'What value is conventionally returned by main() to signal successful program completion?',
        options: ['-1', '0', '1', 'NULL'],
        correct: 1,
        explanation: 'Returning 0 from main() indicates successful execution to the operating system.'
      }
    ]
  },
  {
    id: 'cpp-cert',
    title: 'C++ Programming',
    category: 'PROGRAMMING',
    level: 'ADVANCED',
    levelType: 'advanced',
    iconType: 'code',
    iconColor: '#9333ea',
    iconBg: '#f3e8ff',
    description: 'Demonstrate mastery in C++ object-oriented design, pointers, STL, memory allocation, and templates.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which C++ STL container represents a dynamic contiguous memory array?',
        options: ['std::list', 'std::vector', 'std::deque', 'std::map'],
        correct: 1,
        explanation: 'std::vector provides contiguous memory allocation with dynamic resizing.'
      },
      {
        id: 2,
        question: 'Which feature in C++ allows functions with the same name to exist with different parameters?',
        options: ['Overloading', 'Encapsulation', 'Abstraction', 'Inheritance'],
        correct: 0,
        explanation: 'Function Overloading permits multiple functions with identical names in the same scope.'
      },
      {
        id: 3,
        question: 'Which keyword ensures proper destructor invocation when deleting base class pointers?',
        options: ['virtual', 'override', 'destructor', 'delete'],
        correct: 0,
        explanation: 'Declaring a base class destructor virtual guarantees proper cleanup of derived class destructors.'
      },
      {
        id: 4,
        question: 'Which stream object is used for standard console output in C++?',
        options: ['std::cin', 'std::cout', 'std::cerr', 'std::clog'],
        correct: 1,
        explanation: 'std::cout (character output) writes formatted data to standard output stream.'
      },
      {
        id: 5,
        question: 'What constructor type is called when an object is initialized from another object of the same class?',
        options: ['Default Constructor', 'Copy Constructor', 'Move Constructor', 'Parametric Constructor'],
        correct: 1,
        explanation: 'A Copy Constructor initializes a new object using an existing object of the same class.'
      },
      {
        id: 6,
        question: 'Which operator allocates dynamic memory on the heap in C++?',
        options: ['malloc', 'new', 'alloc', 'create'],
        correct: 1,
        explanation: 'The new operator allocates heap memory and calls class constructors.'
      },
      {
        id: 7,
        question: 'Which C++ smart pointer enforces exclusive single ownership of a heap resource?',
        options: ['std::shared_ptr', 'std::unique_ptr', 'std::weak_ptr', 'std::auto_ptr'],
        correct: 1,
        explanation: 'std::unique_ptr uniquely manages resource lifetime and cannot be copied.'
      },
      {
        id: 8,
        question: 'What access specifier makes members accessible to derived classes but hidden from external code?',
        options: ['public', 'private', 'protected', 'internal'],
        correct: 2,
        explanation: 'protected members are accessible inside class methods and derived child classes.'
      },
      {
        id: 9,
        question: 'Which operator is used for C++ Scope Resolution?',
        options: ['.', '->', '::', ':'],
        correct: 2,
        explanation: 'The scope resolution operator :: identifies global variables or class/namespace scope.'
      },
      {
        id: 10,
        question: 'Which STL header file provides functions like std::sort, std::find, and std::reverse?',
        options: ['<vector>', '<algorithm>', '<numeric>', '<utility>'],
        correct: 1,
        explanation: '<algorithm> contains standard C++ algorithms operating on iterator ranges.'
      },
      {
        id: 11,
        question: 'Which keyword explicitly marks a derived class method as overriding a base class virtual function?',
        options: ['virtual', 'override', 'final', 'extends'],
        correct: 1,
        explanation: 'The override keyword checks at compile-time that a method overrides a base class virtual method.'
      },
      {
        id: 12,
        question: 'What generic feature enables writing type-independent functions and classes in C++?',
        options: ['Templates', 'Macros', 'Inheritance', 'Interfaces'],
        correct: 0,
        explanation: 'C++ Templates allow writing generic code parameterizing types.'
      },
      {
        id: 13,
        question: 'What exception handling keyword initiates throwing an error object in C++?',
        options: ['try', 'catch', 'throw', 'raise'],
        correct: 2,
        explanation: 'The throw keyword signals an exception condition.'
      },
      {
        id: 14,
        question: 'Which operator deallocates memory allocated with array new[] in C++?',
        options: ['delete', 'delete[]', 'free', 'release[]'],
        correct: 1,
        explanation: 'delete[] must be paired with array allocations created via new[].'
      },
      {
        id: 15,
        question: 'What keyword declares a reference variable that cannot modify the underlying target value?',
        options: ['const auto&', 'static ref', 'final&', 'immutable&'],
        correct: 0,
        explanation: 'const references prevent mutating the referenced object while avoiding expensive copies.'
      }
    ]
  },
  {
    id: 'javascript-cert',
    title: 'JavaScript ES6+',
    category: 'PROGRAMMING',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'code',
    iconColor: '#ca8a04',
    iconBg: '#fefce8',
    description: 'Test async JS, closures, DOM manipulation, promises, arrow functions, and modern ES6+ features.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which keyword defines a block-scoped variable that CANNOT be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correct: 2,
        explanation: 'const creates read-only block-scoped references that cannot be reassigned.'
      },
      {
        id: 2,
        question: 'What does the Array.prototype.map() method return?',
        options: ['A single aggregated value', 'A new array containing transformed elements', 'Boolean true/false', 'Original modified array'],
        correct: 1,
        explanation: 'map() creates a new array populated with the results of calling a provided function on every element.'
      },
      {
        id: 3,
        question: 'What is the output of typeof null in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correct: 2,
        explanation: 'typeof null returns "object" due to a legacy bug present since JavaScript inception.'
      },
      {
        id: 4,
        question: 'What feature allows extracting values from arrays or objects into distinct variables in ES6?',
        options: ['Destructuring', 'Spreading', 'Resting', 'Parsing'],
        correct: 0,
        explanation: 'Destructuring assignment syntax unpacks values from arrays or properties from objects into distinct variables.'
      },
      {
        id: 5,
        question: 'Which operator spreads elements of an iterable or merges object properties in ES6?',
        options: ['...', ':::', '&&', '=>'],
        correct: 0,
        explanation: 'The spread operator ... expands iterables into individual elements.'
      },
      {
        id: 6,
        question: 'What is a Closure in JavaScript?',
        options: [
          'A method to close browser windows',
          'A function combined with references to its surrounding lexical environment',
          'A private class constructor',
          'A block statement end bracket'
        ],
        correct: 1,
        explanation: 'A closure gives an inner function access to an outer function scope even after the outer function has returned.'
      },
      {
        id: 7,
        question: 'Which Promise method resolves when ALL input promises in an array successfully resolve?',
        options: ['Promise.race()', 'Promise.all()', 'Promise.any()', 'Promise.settled()'],
        correct: 1,
        explanation: 'Promise.all() waits for all promises to resolve or rejects if any single promise fails.'
      },
      {
        id: 8,
        question: 'What statement prefix pauses execution inside an async function until a Promise settles?',
        options: ['await', 'yield', 'wait', 'defer'],
        correct: 0,
        explanation: 'The await expression causes async function execution to pause until a Promise is settled.'
      },
      {
        id: 9,
        question: 'Which built-in object collection type stores unique values of any type in ES6?',
        options: ['Map', 'Set', 'WeakMap', 'Array'],
        correct: 1,
        explanation: 'Set objects are collections of values where each value occurs only once.'
      },
      {
        id: 10,
        question: 'What is the key difference between strict equality (===) and abstract equality (==)?',
        options: [
          '=== compares values without type conversion; == performs type coercion',
          '== compares object references only',
          '=== only works for numbers',
          'They perform identical comparisons'
        ],
        correct: 0,
        explanation: 'Strict equality === checks both value and type without performing implicit type coercion.'
      },
      {
        id: 11,
        question: 'Which array method tests whether AT LEAST ONE element passes a provided test function?',
        options: ['every()', 'some()', 'filter()', 'find()'],
        correct: 1,
        explanation: 'some() returns true if at least one element satisfies the test function.'
      },
      {
        id: 12,
        question: 'What is the JavaScript Event Loop responsible for?',
        options: [
          'Compiling JS to binary',
          'Monitoring call stack and callback queue to execute asynchronous callbacks',
          'Garbage collecting heap memory',
          'Rendering CSS layouts'
        ],
        correct: 1,
        explanation: 'The Event Loop constantly checks if call stack is empty to execute queued micro/macro tasks.'
      },
      {
        id: 13,
        question: 'Which static method returns an array of an object own enumerable property names?',
        options: ['Object.values()', 'Object.keys()', 'Object.entries()', 'Object.getOwnPropertyNames()'],
        correct: 1,
        explanation: 'Object.keys() returns an array of a given object string-keyed property names.'
      },
      {
        id: 14,
        question: 'What is the return value of Array.prototype.find() if no element satisfies the testing function?',
        options: ['null', 'undefined', '-1', '[]'],
        correct: 1,
        explanation: 'find() returns the value of the first matching element, or undefined if no match is found.'
      },
      {
        id: 15,
        question: 'Which arrow function property makes them different from standard function declarations regarding "this"?',
        options: [
          'Arrow functions do not have their own "this"; they lexically inherit "this" from enclosing scope',
          'Arrow functions have dynamic "this"',
          'Arrow functions cannot return values',
          'Arrow functions cannot accept parameters'
        ],
        correct: 0,
        explanation: 'Arrow functions do not bind their own this; they inherit this from parent lexical context.'
      }
    ]
  },
  {
    id: 'data-science-cert',
    title: 'Data Science & Analytics',
    category: 'DATA SCIENCE',
    level: 'BEGINNER',
    levelType: 'beginner',
    iconType: 'chart',
    iconColor: '#16a34a',
    iconBg: '#f0fdf4',
    description: 'Analyze data, generate insights with Pandas, NumPy, visualization, statistics, and data cleaning.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which Python library is primary for data manipulation and tabular DataFrames?',
        options: ['NumPy', 'Pandas', 'Matplotlib', 'Scipy'],
        correct: 1,
        explanation: 'Pandas is the core library providing high-performance data structures like DataFrame and Series.'
      },
      {
        id: 2,
        question: 'Which measure of central tendency is most affected by extreme value outliers?',
        options: ['Median', 'Mean', 'Mode', 'Interquartile Range'],
        correct: 1,
        explanation: 'The Mean sums all values and divides by count, making it highly sensitive to extreme outliers.'
      },
      {
        id: 3,
        question: 'Which chart plot is best suited to display the continuous distribution of a single numerical variable?',
        options: ['Scatter plot', 'Pie chart', 'Histogram', 'Bar graph'],
        correct: 2,
        explanation: 'Histograms group continuous data into bins to visualize frequency distribution.'
      },
      {
        id: 4,
        question: 'Which library provides high-performance N-dimensional array processing in Python?',
        options: ['Pandas', 'NumPy', 'Seaborn', 'Statsmodels'],
        correct: 1,
        explanation: 'NumPy delivers fast array processing and vectorized mathematical operations.'
      },
      {
        id: 5,
        question: 'Which Pandas method drops rows containing missing NaN values from a DataFrame?',
        options: ['df.clean()', 'df.dropna()', 'df.remove_null()', 'df.filter()'],
        correct: 1,
        explanation: 'df.dropna() removes missing values along specified DataFrame axes.'
      },
      {
        id: 6,
        question: 'What numerical range bounds the Pearson correlation coefficient r?',
        options: ['0 to 1', '-1 to +1', '-100 to +100', '0 to infinity'],
        correct: 1,
        explanation: 'Pearson correlation ranges from -1 (perfect negative correlation) to +1 (perfect positive correlation).'
      },
      {
        id: 7,
        question: 'Which visualization best demonstrates the relationship between two continuous numerical variables?',
        options: ['Bar chart', 'Scatter plot', 'Box plot', 'Heatmap'],
        correct: 1,
        explanation: 'Scatter plots plot points along two axes to inspect correlation and data patterns.'
      },
      {
        id: 8,
        question: 'Which Pandas function splits data into groups based on column criteria for aggregation?',
        options: ['df.split()', 'df.groupby()', 'df.pivot()', 'df.aggregate()'],
        correct: 1,
        explanation: 'groupby() involves splitting data, applying a function, and combining results.'
      },
      {
        id: 9,
        question: 'What statistical value represents the 50th percentile of an ordered dataset?',
        options: ['Mean', 'Median', 'Mode', 'Variance'],
        correct: 1,
        explanation: 'The Median marks the exact middle value separating the higher half from lower half.'
      },
      {
        id: 10,
        question: 'What statistical metric measures the spread or dispersion of data points relative to the mean?',
        options: ['Standard Deviation', 'Median', 'Mode', 'Frequency'],
        correct: 0,
        explanation: 'Standard Deviation quantifies how much data values deviate from the mean.'
      },
      {
        id: 11,
        question: 'Which method previews the first N rows of a Pandas DataFrame?',
        options: ['df.first()', 'df.head()', 'df.top()', 'df.preview()'],
        correct: 1,
        explanation: 'df.head(n) returns the first n rows of a DataFrame (default 5).'
      },
      {
        id: 12,
        question: 'Which SQL operation merges matching data records from two tables based on a common key?',
        options: ['MERGE', 'JOIN', 'UNION', 'GROUP BY'],
        correct: 1,
        explanation: 'JOIN queries combine columns from one or more tables based on a related key.'
      },
      {
        id: 13,
        question: 'What type of plot visualizes the 5-number summary (Min, Q1, Median, Q3, Max) of data?',
        options: ['Scatter plot', 'Box plot', 'Pie chart', 'Line chart'],
        correct: 1,
        explanation: 'Box plots display median, quartiles, and outliers visually.'
      },
      {
        id: 14,
        question: 'What process replaces missing NaN values in a dataset with estimated values (like Mean or Median)?',
        options: ['Imputation', 'Normalization', 'Encoding', 'Scaling'],
        correct: 0,
        explanation: 'Data Imputation replaces missing data with substituted values.'
      },
      {
        id: 15,
        question: 'Which scaling technique transforms features to fit within a bounded [0, 1] range?',
        options: ['StandardScaler', 'MinMaxScaler', 'RobustScaler', 'LogTransform'],
        correct: 1,
        explanation: 'MinMaxScaler rescales data values into the range [0, 1].'
      }
    ]
  },
  {
    id: 'machine-learning-cert',
    title: 'Machine Learning & AI',
    category: 'DATA SCIENCE',
    level: 'ADVANCED',
    levelType: 'advanced',
    iconType: 'chart',
    iconColor: '#dc2626',
    iconBg: '#fef2f2',
    description: 'Evaluate knowledge of classification algorithms, neural networks, regression, metrics, and tuning.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which machine learning algorithm is a supervised ensemble method used for classification?',
        options: ['K-Means Clustering', 'Random Forest', 'PCA', 'DBSCAN'],
        correct: 1,
        explanation: 'Random Forest builds multiple decision trees during training to output classification predictions.'
      },
      {
        id: 2,
        question: 'What metric measures the proportion of total correct predictions out of all predictions?',
        options: ['Recall', 'Precision', 'Accuracy', 'F1-Score'],
        correct: 2,
        explanation: 'Accuracy = (True Positives + True Negatives) / Total Samples.'
      },
      {
        id: 3,
        question: 'Which neural network activation function maps real values into the probability range (0, 1)?',
        options: ['ReLU', 'Sigmoid', 'Tanh', 'Leaky ReLU'],
        correct: 1,
        explanation: 'Sigmoid activation curves S-shape outputs between 0 and 1.'
      },
      {
        id: 4,
        question: 'What phenomenon occurs when a model performs exceptionally on training data but poorly on unseen test data?',
        options: ['Underfitting', 'Overfitting', 'Generalization', 'Convergence'],
        correct: 1,
        explanation: 'Overfitting happens when a model learns noise and specific training samples rather than general patterns.'
      },
      {
        id: 5,
        question: 'Which algorithm is an unsupervised learning method for grouping unlabelled data clusters?',
        options: ['Logistic Regression', 'Linear Regression', 'K-Means', 'Naive Bayes'],
        correct: 2,
        explanation: 'K-Means partitions unlabelled observations into K distinct clusters.'
      },
      {
        id: 6,
        question: 'What function measures the difference between model predictions and true ground truth labels?',
        options: ['Activation Function', 'Loss Function', 'Optimization Function', 'Reward Function'],
        correct: 1,
        explanation: 'A Loss (or Cost) function quantifies error to guide model weight updates during training.'
      },
      {
        id: 7,
        question: 'Which optimization algorithm iteratively adjusts weights to minimize loss by moving in opposite gradient direction?',
        options: ['Gradient Descent', 'Backpropagation', 'Random Search', 'Grid Search'],
        correct: 0,
        explanation: 'Gradient Descent updates parameters iteratively to find loss function minimum.'
      },
      {
        id: 8,
        question: 'What metric measures out of all actual positive cases, how many were correctly identified?',
        options: ['Precision', 'Recall (Sensitivity)', 'Specificity', 'Accuracy'],
        correct: 1,
        explanation: 'Recall = True Positives / (True Positives + False Negatives).'
      },
      {
        id: 9,
        question: 'Which machine learning task predicts continuous numerical target outputs (e.g. house prices)?',
        options: ['Classification', 'Regression', 'Clustering', 'Dimensionality Reduction'],
        correct: 1,
        explanation: 'Regression algorithms predict continuous real values.'
      },
      {
        id: 10,
        question: 'Which specialized neural network architecture is tailored for grid-like image feature extraction?',
        options: ['RNN', 'CNN', 'LSTM', 'Transformer'],
        correct: 1,
        explanation: 'Convolutional Neural Networks (CNNs) use spatial filters ideal for image recognition.'
      },
      {
        id: 11,
        question: 'What is the term for model settings configured manually prior to training (e.g. learning rate)?',
        options: ['Parameters', 'Hyperparameters', 'Weights', 'Biases'],
        correct: 1,
        explanation: 'Hyperparameters are external configuration choices set before training starts.'
      },
      {
        id: 12,
        question: 'Which simple non-linear activation returns max(0, x)?',
        options: ['Sigmoid', 'Tanh', 'ReLU', 'Softmax'],
        correct: 2,
        explanation: 'Rectified Linear Unit (ReLU) sets negative values to 0 and passes positive values unchanged.'
      },
      {
        id: 13,
        question: 'What matrix evaluates classification performance by tabulating True/False Positives and Negatives?',
        options: ['Correlation Matrix', 'Confusion Matrix', 'Covariance Matrix', 'Hessian Matrix'],
        correct: 1,
        explanation: 'A Confusion Matrix cross-tabulates actual vs predicted class classifications.'
      },
      {
        id: 14,
        question: 'Which technique reduces dataset feature dimensions while preserving maximum variance?',
        options: ['PCA (Principal Component Analysis)', 'K-Fold', 'Cross Validation', 'Regularization'],
        correct: 0,
        explanation: 'PCA projects high-dimensional data onto orthogonal principal components.'
      },
      {
        id: 15,
        question: 'Which validation method splits data into K subsets to evaluate model stability?',
        options: ['K-Fold Cross Validation', 'Bootstrap Aggregation', 'Holdout Split', 'Grid Search'],
        correct: 0,
        explanation: 'K-Fold Cross Validation iterates training/testing across K folds for robust evaluation.'
      }
    ]
  },
  {
    id: 'mobile-dev-cert',
    title: 'Android & Flutter Dev',
    category: 'MOBILE DEV',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'mobile',
    iconColor: '#059669',
    iconBg: '#ecfdf5',
    description: 'Build and test mobile applications using Flutter, Dart, React Native, and mobile UI practices.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which programming language powers Google Flutter framework for cross-platform apps?',
        options: ['Java', 'Kotlin', 'Dart', 'Swift'],
        correct: 2,
        explanation: 'Flutter applications are built using the Dart programming language.'
      },
      {
        id: 2,
        question: 'In Flutter, which widget subclass is used for UI components that hold dynamic internal state?',
        options: ['StatelessWidget', 'StatefulWidget', 'InheritedWidget', 'BuildWidget'],
        correct: 1,
        explanation: 'StatefulWidget creates widgets that can change their state dynamically during runtime.'
      },
      {
        id: 3,
        question: 'Which configuration file manages dependencies, assets, and fonts in a Flutter project?',
        options: ['package.json', 'pubspec.yaml', 'build.gradle', 'AndroidManifest.xml'],
        correct: 1,
        explanation: 'pubspec.yaml specifies Flutter project dependencies, versioning, and asset references.'
      },
      {
        id: 4,
        question: 'Which Flutter method triggers a rebuild of the widget tree when state changes?',
        options: ['refreshUI()', 'setState()', 'updateState()', 'rebuild()'],
        correct: 1,
        explanation: 'Calling setState() notifies the framework that the internal state of an object has changed.'
      },
      {
        id: 5,
        question: 'What object in Flutter holds location handle context within the overall widget tree structure?',
        options: ['BuildContext', 'WidgetContext', 'RenderContext', 'StateContext'],
        correct: 0,
        explanation: 'BuildContext is a handle to the location of a widget in the widget tree.'
      },
      {
        id: 6,
        question: 'Which Flutter widget lays out children in a vertical linear sequence?',
        options: ['Row', 'Column', 'Stack', 'ListView'],
        correct: 1,
        explanation: 'Column displays its children in a vertical array.'
      },
      {
        id: 7,
        question: 'What feature allows Flutter developers to view UI code updates instantly without restarting app state?',
        options: ['Hot Reload', 'Cold Boot', 'Fast Compile', 'Live Sync'],
        correct: 0,
        explanation: 'Hot Reload injects updated source code files into the running Dart VM instantly.'
      },
      {
        id: 8,
        question: 'Which native language is recommended by Google for modern Android development alongside Java?',
        options: ['Swift', 'Kotlin', 'Dart', 'C#'],
        correct: 1,
        explanation: 'Kotlin is Google official preferred language for Android application development.'
      },
      {
        id: 9,
        question: 'Which Android file declares application permissions, components, and package hardware requirements?',
        options: ['build.gradle', 'AndroidManifest.xml', 'MainActivity.java', 'res/values/strings.xml'],
        correct: 1,
        explanation: 'AndroidManifest.xml describes essential information about your app to the Android build tools and OS.'
      },
      {
        id: 10,
        question: 'Which Flutter widget constructor builds items lazily only as they become visible on screen?',
        options: ['ListView.builder', 'Column', 'SingleChildScrollView', 'Wrap'],
        correct: 0,
        explanation: 'ListView.builder constructs scrollable items lazily as they scroll into view for optimal performance.'
      },
      {
        id: 11,
        question: 'What asynchronous type represents a delayed value computation in Dart?',
        options: ['Promise', 'Future', 'Observable', 'Task'],
        correct: 1,
        explanation: 'A Future represents a computation that completes asynchronously with a value or error.'
      },
      {
        id: 12,
        question: 'Which Flutter widget overlays children on top of each other like layers?',
        options: ['Column', 'Row', 'Stack', 'Grid'],
        correct: 2,
        explanation: 'Stack allows positioning child widgets on top of each other.'
      },
      {
        id: 13,
        question: 'Which class provides pre-built Material Design screen layout structure (AppBar, Drawer, Body)?',
        options: ['Scaffold', 'MaterialApp', 'Container', 'ScreenView'],
        correct: 0,
        explanation: 'Scaffold implements the basic Material Design visual layout structure.'
      },
      {
        id: 14,
        question: 'What command-line tool checks for installed Flutter SDK tooling and dependencies?',
        options: ['flutter run', 'flutter doctor', 'flutter check', 'flutter build'],
        correct: 1,
        explanation: 'flutter doctor inspects local environment and reports status of Flutter installations.'
      },
      {
        id: 15,
        question: 'Which component handles screen route transitions in Flutter applications?',
        options: ['Router', 'Navigator', 'RouteManager', 'ScreenSwitcher'],
        correct: 1,
        explanation: 'Navigator manages a stack of Route objects to transition between application screens.'
      }
    ]
  },
  {
    id: 'cyber-sec-cert',
    title: 'Ethical Hacking & Security',
    category: 'CYBER SECURITY',
    level: 'ADVANCED',
    levelType: 'advanced',
    iconType: 'shield',
    iconColor: '#d97706',
    iconBg: '#fffbeb',
    description: 'Validate skills in network security, packet analysis, Wireshark, Nmap, and vulnerability auditing.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which tool is widely used for network packet capturing and deep protocol analysis?',
        options: ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite'],
        correct: 1,
        explanation: 'Wireshark is the premier open-source network packet analyzer tool.'
      },
      {
        id: 2,
        question: 'What type of attack floods a target server with fictitious requests to render it inaccessible?',
        options: ['SQL Injection', 'DDoS Attack', 'Man-in-the-Middle', 'XSS Attack'],
        correct: 1,
        explanation: 'Distributed Denial of Service (DDoS) attempts to crash a network or server by overwhelming traffic.'
      },
      {
        id: 3,
        question: 'What standard port is dedicated to secure encrypted HTTPS web traffic?',
        options: ['80', '21', '443', '22'],
        correct: 2,
        explanation: 'Port 443 is the default port used for SSL/TLS encrypted HTTPS communications.'
      },
      {
        id: 4,
        question: 'Which attack vector injects malicious database statements into application input fields?',
        options: ['XSS', 'SQL Injection', 'CSRF', 'Buffer Overflow'],
        correct: 1,
        explanation: 'SQL Injection allows attackers to manipulate database queries by injecting backend SQL code.'
      },
      {
        id: 5,
        question: 'Which tool is primarily used for network discovery and security port scanning?',
        options: ['Nmap', 'Wireshark', 'John the Ripper', 'Snort'],
        correct: 0,
        explanation: 'Nmap (Network Mapper) discovers hosts and services on a computer network by scanning open ports.'
      },
      {
        id: 6,
        question: 'What type of web vulnerability executes malicious JavaScript inside a victim browser session?',
        options: ['SQLi', 'XSS (Cross-Site Scripting)', 'Directory Traversal', 'Brute Force'],
        correct: 1,
        explanation: 'XSS enables attackers to inject client-side scripts into web pages viewed by users.'
      },
      {
        id: 7,
        question: 'Which cryptographic algorithm category uses different keys for encryption and decryption (Public/Private)?',
        options: ['Symmetric Encryption', 'Asymmetric (Public Key) Encryption', 'Hashing', 'Encoding'],
        correct: 1,
        explanation: 'Asymmetric encryption uses a public key to encrypt and a private key to decrypt data.'
      },
      {
        id: 8,
        question: 'What security device acts as a barrier inspecting and filtering network traffic according to rules?',
        options: ['Router', 'Firewall', 'Switch', 'Modem'],
        correct: 1,
        explanation: 'A Firewall monitors incoming and outgoing network traffic based on configured security policies.'
      },
      {
        id: 9,
        question: 'What social engineering tactic tricks individuals into revealing confidential credentials via fake emails?',
        options: ['Phishing', 'Spoofing', 'Eavesdropping', 'Port Scanning'],
        correct: 0,
        explanation: 'Phishing uses deceptive communications designed to trick targets into handing over sensitive information.'
      },
      {
        id: 10,
        question: 'What attack intercepts and potentially alters communication between two unsuspecting parties?',
        options: ['Man-in-the-Middle (MitM)', 'SQLi', 'DDoS', 'Zero-Day'],
        correct: 0,
        explanation: 'In MitM attacks, an attacker secretly relays and alters communications between two entities.'
      },
      {
        id: 11,
        question: 'What practice appends random strings to passwords before hashing to defeat precomputed rainbow tables?',
        options: ['Salting', 'Pepper', 'Padding', 'Stretching'],
        correct: 0,
        explanation: 'Password salting adds random data to input before hashing to produce unique hashes.'
      },
      {
        id: 12,
        question: 'What standard list tracks the top critical web application security risks globally?',
        options: ['OWASP Top 10', 'NIST 800-53', 'ISO 27001', 'CVE Index'],
        correct: 0,
        explanation: 'The OWASP Top 10 is a standard awareness document outlining critical web security risks.'
      },
      {
        id: 13,
        question: 'What network protocol establishes an encrypted private tunnel over a public internet network?',
        options: ['VPN', 'DNS', 'DHCP', 'FTP'],
        correct: 0,
        explanation: 'Virtual Private Networks (VPNs) create secure encrypted connections across public networks.'
      },
      {
        id: 14,
        question: 'What default port is used for SSH (Secure Shell) remote terminal access?',
        options: ['80', '22', '25', '110'],
        correct: 1,
        explanation: 'Port 22 is assigned for SSH encrypted remote logins.'
      },
      {
        id: 15,
        question: 'What term describes an authorized simulated cyberattack performed to evaluate system security?',
        options: ['Penetration Testing (Pen Testing)', 'Black Hat Hacking', 'Ransomware', 'Social Engineering'],
        correct: 0,
        explanation: 'Penetration testing tests defense barriers by safely exploiting vulnerabilities.'
      }
    ]
  },
  {
    id: 'ui-ux-cert',
    title: 'UI/UX & Figma Design',
    category: 'DESIGN',
    level: 'BEGINNER',
    levelType: 'beginner',
    iconType: 'layout',
    iconColor: '#db2777',
    iconBg: '#fdf2f8',
    description: 'Test wireframing, color contrast, Auto Layout, components, and interactive Figma prototyping.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'What does the acronym UX stand for in digital product design?',
        options: ['User Experience', 'Universal Extension', 'User Execution', 'Unified Interface'],
        correct: 0,
        explanation: 'UX stands for User Experience, focusing on overall user satisfaction and interaction quality.'
      },
      {
        id: 2,
        question: 'Which Figma feature automatically resizes layout containers based on child content size?',
        options: ['Constraints', 'Auto Layout', 'Grid System', 'Smart Animate'],
        correct: 1,
        explanation: 'Auto Layout adds dynamic padding and alignment responsive behavior to frames in Figma.'
      },
      {
        id: 3,
        question: 'What design artifact illustrates low-fidelity structural page layouts without visual color styling?',
        options: ['High-fi Prototype', 'Wireframe', 'Moodboard', 'Style Guide'],
        correct: 1,
        explanation: 'Wireframes are basic visual blueprints establishing structural page layouts and flow.'
      },
      {
        id: 4,
        question: 'Which WCAG guidelines measure text accessibility contrast against background colors?',
        options: ['Color Contrast Ratio', 'Pixel Density', 'Kerning Scale', 'Aspect Ratio'],
        correct: 0,
        explanation: 'Color Contrast Ratio ensures text remains readable for users with visual impairments.'
      },
      {
        id: 5,
        question: 'What Figma feature allows creating reusable master design elements across multiple screens?',
        options: ['Components (❖)', 'Group', 'Frame', 'Mask'],
        correct: 0,
        explanation: 'Components (❖) are master elements that can be reused across design projects.'
      },
      {
        id: 6,
        question: 'What concept describes visual cues indicating how an object can be interacted with (e.g. raised button)?',
        options: ['Affordance', 'Skeuomorphism', 'Heuristics', 'Fitts Law'],
        correct: 0,
        explanation: 'Affordance refers to visual properties of an object that communicate its functionality.'
      },
      {
        id: 7,
        question: 'What is a User Persona in UX research?',
        options: [
          'A fictional character representing a target user segment based on research data',
          'A company employee profile',
          'A competitor analysis report',
          'A database schema user model'
        ],
        correct: 0,
        explanation: 'User Personas represent target user goals, behaviors, and pain points.'
      },
      {
        id: 8,
        question: 'What UX design law states that time to acquire a target depends on distance and target size?',
        options: ['Fitts Law', 'Hick Law', 'Miller Law', 'Jakob Law'],
        correct: 0,
        explanation: 'Fitts Law models target acquisition speed based on button size and proximity.'
      },
      {
        id: 9,
        question: 'What methodology tests two alternative design variations (A vs B) to compare conversion performance?',
        options: ['A/B Testing', 'Usability Lab', 'Heuristic Review', 'Card Sorting'],
        correct: 0,
        explanation: 'A/B testing compares two variants of a design to determine which performs better.'
      },
      {
        id: 10,
        question: 'What design system grid standard spacing interval is most widely used across web and mobile layouts?',
        options: ['8px Grid System', '5px Grid System', '12px Grid System', '7px Grid System'],
        correct: 0,
        explanation: 'An 8px grid system simplifies design scaling across responsive breakpoints.'
      },
      {
        id: 11,
        question: 'What is Information Architecture (IA) in UX?',
        options: [
          'Structural organization, labeling, and hierarchy of app content',
          'Server infrastructure design',
          'CSS style sheets',
          'Database indexing'
        ],
        correct: 0,
        explanation: 'Information Architecture organizes and structures content logically for easy navigation.'
      },
      {
        id: 12,
        question: 'What transition feature in Figma creates smooth animated transitions between matching layers?',
        options: ['Smart Animate', 'Instant Pass', 'Dissolve Only', 'Linear Motion'],
        correct: 0,
        explanation: 'Smart Animate looks for matching layers across frames to generate smooth animations.'
      },
      {
        id: 13,
        question: 'What visual principle uses size, color, and weight contrast to direct user attention to key elements?',
        options: ['Visual Hierarchy', 'Color Balance', 'Symmetry', 'Proximity'],
        correct: 0,
        explanation: 'Visual Hierarchy arranges elements in order of importance.'
      },
      {
        id: 14,
        question: 'What UX research exercise helps discover how users naturally categorize navigational topics?',
        options: ['Card Sorting', 'Tree Testing', 'Eye Tracking', 'Surveys'],
        correct: 0,
        explanation: 'Card Sorting involves users organizing information into logical categories.'
      },
      {
        id: 15,
        question: 'What is a Micro-interaction in interface design?',
        options: [
          'Subtle single-purpose visual animations giving feedback on user actions (like a button heart toggle)',
          'A microservice API call',
          'A small banner ad',
          'A tiny font size'
        ],
        correct: 0,
        explanation: 'Micro-interactions are small functional animations that provide feedback and delight.'
      }
    ]
  },
  {
    id: 'sql-cert',
    title: 'SQL & Database Design',
    category: 'DATA SCIENCE',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'database',
    iconColor: '#0284c7',
    iconBg: '#f0f9ff',
    description: 'Assess complex SQL queries, JOINs, database normalization, indexing, and relational schema design.',
    duration: '15 minute',
    questions: '15 Questions',
    passScore: 'Instant Score',
    reward: 'Verified Certificate',
    quizQuestions: [
      {
        id: 1,
        question: 'Which SQL clause filters records after a GROUP BY aggregation operation?',
        options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
        correct: 1,
        explanation: 'HAVING filters aggregated grouped records, whereas WHERE filters individual rows before grouping.'
      },
      {
        id: 2,
        question: 'Which JOIN returns ALL rows from the left table and matching records from the right table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
        correct: 1,
        explanation: 'LEFT JOIN returns all rows from the left table regardless of right table matches.'
      },
      {
        id: 3,
        question: 'Which key constraint uniquely identifies each record row in a relational database table?',
        options: ['Foreign Key', 'Primary Key', 'Candidate Key', 'Composite Key'],
        correct: 1,
        explanation: 'A Primary Key uniquely identifies each row and cannot contain NULL values.'
      },
      {
        id: 4,
        question: 'Which key constraint establishes a relational link between two database tables?',
        options: ['Primary Key', 'Foreign Key', 'Unique Key', 'Index Key'],
        correct: 1,
        explanation: 'A Foreign Key references the Primary Key of another table to enforce referential integrity.'
      },
      {
        id: 5,
        question: 'Which SQL function returns the total count of rows in a table matching criteria?',
        options: ['SUM()', 'COUNT()', 'TOTAL()', 'NUMBER()'],
        correct: 1,
        explanation: 'COUNT() returns the number of rows that match specified search criteria.'
      },
      {
        id: 6,
        question: 'What database structure speeds up data retrieval operations on a table at the cost of additional write overhead?',
        options: ['Index', 'Trigger', 'View', 'Procedure'],
        correct: 0,
        explanation: 'Indexes create lookup data structures (like B-Trees) that accelerate SELECT query speeds.'
      },
      {
        id: 7,
        question: 'Which SQL command permanently removes a table structure and all its contained data from the database?',
        options: ['DELETE TABLE', 'TRUNCATE TABLE', 'DROP TABLE', 'REMOVE TABLE'],
        correct: 2,
        explanation: 'DROP TABLE removes the entire table definition and data from the database schema.'
      },
      {
        id: 8,
        question: 'Which clause sorts query result rows in descending order?',
        options: ['ORDER BY col DESC', 'SORT BY col DOWN', 'GROUP BY col DESC', 'ARRANGE col DESC'],
        correct: 0,
        explanation: 'ORDER BY column_name DESC sorts results from highest to lowest.'
      },
      {
        id: 9,
        question: 'Which wildcard operator matches any sequence of zero or more characters in a SQL LIKE pattern?',
        options: ['%', '_', '*', '?'],
        correct: 0,
        explanation: 'The % wildcard matches zero or more characters in SQL LIKE searches.'
      },
      {
        id: 10,
        question: 'What process structures database schemas to reduce data redundancy and improve integrity?',
        options: ['Normalization', 'Denormalization', 'Sharding', 'Indexing'],
        correct: 0,
        explanation: 'Database Normalization organizes tables to minimize data redundancy.'
      },
      {
        id: 11,
        question: 'What set of principles guarantees reliable processing of database transactions?',
        options: ['ACID', 'BASE', 'REST', 'CRUD'],
        correct: 0,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.'
      },
      {
        id: 12,
        question: 'Which SQL statement modifies existing record row values in a table?',
        options: ['CHANGE', 'MODIFY', 'UPDATE', 'SET'],
        correct: 2,
        explanation: 'The UPDATE statement modifies existing data values in a database table.'
      },
      {
        id: 13,
        question: 'Which operator combines the result sets of two SELECT queries into a single dataset removing duplicates?',
        options: ['UNION', 'JOIN', 'INTERSECT', 'COMBINE'],
        correct: 0,
        explanation: 'UNION combines distinct result rows from multiple SELECT statements.'
      },
      {
        id: 14,
        question: 'What command commits all pending transactional changes permanently to the database?',
        options: ['ROLLBACK', 'SAVEPOINT', 'COMMIT', 'EXECUTE'],
        correct: 2,
        explanation: 'COMMIT saves all transactional changes made during the current transaction.'
      },
      {
        id: 15,
        question: 'What is a subquery in SQL?',
        options: [
          'A SELECT query nested inside another SQL statement',
          'A database backup script',
          'A short column name',
          'A failed query execution'
        ],
        correct: 0,
        explanation: 'A subquery is a query nested inside a SELECT, INSERT, UPDATE, or DELETE statement.'
      }
    ]
  }
];

export default function BrowseCoursesPage({ onSelectCourse, user, onRequireAuth }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  // Dedicated Full-Page Test State
  const [activeTestCourse, setActiveTestCourse] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qIdx]: optionIndex }
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  const categories = ['ALL', 'DEVELOPMENT', 'PROGRAMMING', 'DATA SCIENCE', 'MOBILE DEV', 'CYBER SECURITY', 'DESIGN'];

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || course.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getIcon = (type, color) => {
    switch (type) {
      case 'chart':
        return <BarChart2 size={24} color={color} />;
      case 'mobile':
        return <Smartphone size={24} color={color} />;
      case 'shield':
        return <Shield size={24} color={color} />;
      case 'layout':
        return <Layout size={24} color={color} />;
      case 'database':
        return <Database size={24} color={color} />;
      case 'cloud':
        return <Cloud size={24} color={color} />;
      case 'code':
      default:
        return <Code size={24} color={color} />;
    }
  };

  const handleStartTest = (course) => {
    if (!user) {
      if (onRequireAuth) onRequireAuth();
      return;
    }
    setActiveTestCourse(course);
    setCurrentQIndex(0);
    setUserAnswers({});
    setIsTestSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qIdx, optIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleNextQuestion = () => {
    const questionsCount = activeTestCourse?.quizQuestions?.length || 15;
    if (currentQIndex < questionsCount - 1) {
      setCurrentQIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitTest = () => {
    setIsTestSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitTest = () => {
    setActiveTestCourse(null);
    setCurrentQIndex(0);
    setUserAnswers({});
    setIsTestSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Score Calculation
  const calculateScore = () => {
    if (!activeTestCourse) return { correctCount: 0, total: 15, percentage: 0 };
    const questions = activeTestCourse.quizQuestions;
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    return { correctCount, total: questions.length, percentage };
  };

  // -------------------------------------------------------------
  // RENDER DEDICATED FULL-PAGE TEST VIEW IF A TEST IS ACTIVE
  // -------------------------------------------------------------
  if (activeTestCourse) {
    const questions = activeTestCourse.quizQuestions || [];
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentQIndex];
    const selectedOpt = userAnswers[currentQIndex];
    const hasAnsweredCurrent = selectedOpt !== undefined;
    const progressPercent = Math.round(((currentQIndex + 1) / totalQuestions) * 100);
    const scoreResult = calculateScore();

    return (
      <div className="test-full-page">
        {/* Top Floating Navigation Bar */}
        <div className="test-top-navbar">
          <button className="btn-exit-test" onClick={handleExitTest}>
            <ArrowLeft size={18} />
            <span>Exit Test</span>
          </button>

          <div className="test-nav-title-group">
            <span className="test-course-badge">{activeTestCourse.title}</span>
            <span className="test-step-indicator">Question {currentQIndex + 1} of {totalQuestions}</span>
          </div>

          <div className="test-answered-pill">
            <CheckCircle2 size={16} color="#10b981" />
            <span>{Object.keys(userAnswers).length} / {totalQuestions} Answered</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="test-progress-bar-container">
          <div className="test-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {!isTestSubmitted ? (
          /* TEST IN PROGRESS VIEW (1 Question per Screen) */
          <div className="test-container-box">
            
            {/* Question Header Card */}
            <div className="test-question-card">
              <div className="question-badge-row">
                <span className="q-number-chip">Question {currentQIndex + 1}</span>
                <span className="q-category-chip">{activeTestCourse.category}</span>
              </div>

              <h2 className="test-question-text">
                {currentQuestion.question}
              </h2>

              {/* Options Grid */}
              <div className="test-options-list">
                {currentQuestion.options.map((optionText, optIdx) => {
                  const isSelected = selectedOpt === optIdx;
                  const isCorrect = optIdx === currentQuestion.correct;

                  let optionClass = 'test-option-btn';
                  if (hasAnsweredCurrent) {
                    if (isCorrect) {
                      optionClass += ' option-correct';
                    } else if (isSelected && !isCorrect) {
                      optionClass += ' option-incorrect';
                    } else {
                      optionClass += ' option-disabled';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className={optionClass}
                      onClick={() => handleSelectOption(currentQIndex, optIdx)}
                    >
                      <div className="opt-letter-badge">
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="opt-text-content">{optionText}</span>
                      {hasAnsweredCurrent && isCorrect && (
                        <CheckCircle2 size={20} className="status-icon-right" color="#10b981" />
                      )}
                      {hasAnsweredCurrent && isSelected && !isCorrect && (
                        <XCircle size={20} className="status-icon-right" color="#ef4444" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* IMMEDIATE ANSWER FEEDBACK & EXPLANATION BOX */}
              {hasAnsweredCurrent && (
                <div className={`answer-feedback-card ${selectedOpt === currentQuestion.correct ? 'feedback-success' : 'feedback-error'}`}>
                  <div className="feedback-title-row">
                    {selectedOpt === currentQuestion.correct ? (
                      <>
                        <CheckCircle2 size={22} color="#10b981" />
                        <span className="feedback-status-text success-text">Correct Answer!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={22} color="#ef4444" />
                        <span className="feedback-status-text error-text">
                          Incorrect. Correct Answer: Option {String.fromCharCode(65 + currentQuestion.correct)} ("{currentQuestion.options[currentQuestion.correct]}")
                        </span>
                      </>
                    )}
                  </div>
                  <div className="feedback-explanation">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Quick Question Picker Dots */}
            <div className="test-quick-picker">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  className={`picker-dot ${idx === currentQIndex ? 'active' : ''} ${userAnswers[idx] !== undefined ? 'answered' : ''}`}
                  onClick={() => {
                    setCurrentQIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  title={`Go to Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Footer Control Buttons */}
            <div className="test-footer-controls">
              <button 
                className="btn-test-nav btn-test-prev"
                onClick={handlePrevQuestion}
                disabled={currentQIndex === 0}
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              {currentQIndex < totalQuestions - 1 ? (
                <button 
                  className="btn-test-nav btn-test-next"
                  onClick={handleNextQuestion}
                >
                  <span>Next Question</span>
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  className="btn-test-nav btn-test-submit"
                  onClick={handleSubmitTest}
                >
                  <Sparkles size={18} />
                  <span>Submit Test ({Object.keys(userAnswers).length}/{totalQuestions})</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* TEST RESULT SUMMARY SCREEN */
          <div className="test-result-container">
            <FadeIn direction="up">
              <div className="result-hero-card">
                <div className="result-score-badge">
                  <Award size={54} color={scoreResult.percentage >= 60 ? "#10b981" : "#3b82f6"} />
                </div>

                <h1 className="result-main-title">
                  {scoreResult.percentage >= 60 ? "Congratulations! Test Passed 🎉" : "Knowledge Assessment Completed 💡"}
                </h1>

                <p className="result-sub-desc">
                  You evaluated your skills in <strong>{activeTestCourse.title}</strong> by answering 15 comprehensive questions.
                </p>

                {/* Score Display Card */}
                <div className="score-hero-box">
                  <div className="score-big-number">{scoreResult.percentage}%</div>
                  <div className="score-fraction">{scoreResult.correctCount} / {scoreResult.total} Correct Answers</div>
                  <div className="score-status-chip">
                    {scoreResult.percentage >= 60 ? "VERIFIED PROFICIENT" : "KEEP LEARNING"}
                  </div>
                </div>

                <div className="result-action-buttons">
                  <motion.button 
                    className="btn-secondary" 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setCurrentQIndex(0);
                      setUserAnswers({});
                      setIsTestSubmitted(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <RotateCcw size={18} />
                    <span>Retake Test</span>
                  </motion.button>
                  <motion.button 
                    className="btn-primary" 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleExitTest}
                  >
                    <CheckCircle2 size={18} />
                    <span>Back to All Courses</span>
                  </motion.button>
                </div>
              </div>
            </FadeIn>

            {/* Detailed Question Review List */}
            <FadeIn direction="up" delay={0.15}>
              <div className="result-questions-review">
                <h3 className="review-section-title">Detailed Question Breakdown</h3>

                <StaggerContainer className="review-cards-list" staggerChildren={0.05}>
                  {questions.map((q, idx) => {
                    const userAns = userAnswers[idx];
                    const isRight = userAns === q.correct;

                    return (
                      <StaggerItem key={q.id || idx}>
                        <div className={`review-card ${isRight ? 'review-right' : 'review-wrong'}`}>
                          <div className="review-q-header">
                            <span className="review-q-num">Q{idx + 1}</span>
                            <h4>{q.question}</h4>
                            <span className={`review-status-tag ${isRight ? 'tag-correct' : 'tag-wrong'}`}>
                              {isRight ? '✓ Correct' : '✕ Incorrect'}
                            </span>
                          </div>

                          <div className="review-options-summary">
                            <p>
                              <strong>Your Answer:</strong> {userAns !== undefined ? `${String.fromCharCode(65 + userAns)}: ${q.options[userAns]}` : 'Not Answered'}
                            </p>
                            {!isRight && (
                              <p className="correct-ans-highlight">
                                <strong>Correct Answer:</strong> {String.fromCharCode(65 + q.correct)}: {q.options[q.correct]}
                              </p>
                            )}
                            <p className="review-exp-text">
                              <strong>Explanation:</strong> {q.explanation}
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </FadeIn>

          </div>
        )}

      </div>
    );
  }

  // -------------------------------------------------------------
  // DEFAULT COURSES CATALOG & GRID VIEW
  // -------------------------------------------------------------
  return (
    <div className="browse-courses-page">
      {/* Header Container */}
      <FadeIn direction="up">
        <div className="courses-header-container">
          <h1 className="courses-main-title">
            Skill Verification <span className="blue-title-highlight">Tests</span>
          </h1>
          <p className="courses-sub-title">
            Test your technical knowledge across 15 interactive questions per domain. Receive instant answer feedback and earn verified credentials.
          </p>

          {/* Search Bar Wrapper */}
          <div className="search-bar-wrapper">
            <div className="search-bar-input-group">
              <Search className="search-bar-icon" size={20} />
              <input 
                type="text" 
                className="search-bar-field"
                placeholder="Search by technology (e.g. Web Dev, Python, Java, SQL, Cyber)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="category-pills-row">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Courses Cards Grid */}
      {filteredCourses.length > 0 ? (
        <StaggerContainer className="courses-grid-container" staggerChildren={0.08}>
          {filteredCourses.map(course => (
            <StaggerItem key={course.id}>
              <motion.div 
                className="course-card-item"
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25, ease: 'easeOut' } }}
              >
                {/* Card Header Bar */}
                <div className="card-top-bar">
                  <div className="course-icon-circle" style={{ background: course.iconBg }}>
                    {getIcon(course.iconType, course.iconColor)}
                  </div>
                  <span className={`level-pill-badge level-${course.levelType}`}>
                    {course.level}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="course-category-tag">{course.category}</div>
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-description">{course.description}</p>

                {/* Metadata Details */}
                <div className="course-meta-details">
                  <div className="meta-info-item">
                    <Clock size={15} className="meta-info-icon" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="meta-info-item">
                    <HelpCircle size={15} className="meta-info-icon" />
                    <span>{course.questions}</span>
                  </div>
                  <div className="meta-info-item">
                    <CheckCircle2 size={15} className="meta-info-icon" />
                    <span>{course.passScore}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="course-card-footer">
                  <motion.button 
                    className="btn-start-course"
                    onClick={() => handleStartTest(course)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Start Test</span>
                    <ArrowRight size={16} className="start-arrow" />
                  </motion.button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="courses-empty-state">
          <Search size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
          <h3>No skill tests found</h3>
          <p>Try searching for keywords like "Python", "Java", "SQL", or select another category.</p>
        </div>
      )}
    </div>
  );
}
