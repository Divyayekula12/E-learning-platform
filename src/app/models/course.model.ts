export class Course {
    id: number;
    title: string;
    instructor: string;
    price: number;
    description: string;
    
    constructor(
      id: number = 0,
      title: string = '',
      instructor: string = '',
      price: number = 0,
      description: string = ''
     
    ) {
      this.id = id;
      this.title = title;
      this.instructor = instructor;
      this.price = price;
      this.description = description;
      
    }
  }
  

