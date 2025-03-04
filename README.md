# COGIP API

This project is the backend API for the COGIP (Company Organization and General Information Platform). It provides various endpoints to manage and retrieve information about companies, contacts, and invoices.

## Routes
### Authentication 
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login a user |

### Companies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/company` | Get all companies |
| GET    | `/api/countCompanies` | Get total number of companies |
| GET    | `/api/searchCompany/:name` | Search company by name |
| GET    | `/api/ascSortedCompanies/:limit/:offset` | Get paginated companies sorted by name (ASC) |
| GET    | `/api/descSortedCompanies/:limit/:offset` | Get paginated companies sorted by name (DESC) |
| GET    | `/api/company/:id` | Get company by ID |
| PUT    | `/api/company/:id` | Update a company |
| POST   | `/api/company` | Create a new company |
| DELETE | `/api/company/:id` | Delete a company |

### Contacts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/contact` | Get all contacts |
| GET    | `/api/countContacts` | Get total number of contacts |
| GET    | `/api/searchContact/:name` | Search contact by name |
| GET    | `/api/sortedAscContacts/:limit/:offset` | Get paginated contacts sorted by name (ASC) |
| GET    | `/api/sortedDescContacts/:limit/:offset` | Get paginated contacts sorted by name (DESC) |
| PUT    | `/api/contact/:id` | Update a contact |
| POST   | `/api/contact` | Create a new contact |
| DELETE | `/api/contact/:id` | Delete a contact |

### Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/invoice` | Get all invoices |
| GET    | `/api/countInvoices` | Get total number of invoices |
| GET    | `/api/paginatedInvoices/:limit/:offset` | Get paginated invoices |
| GET    | `/api/sortAscDueDate/:limit/:offset` | Get invoices sorted by due date (ASC) |
| GET    | `/api/sortDescDueDate/:limit/:offset` | Get invoices sorted by due date (DESC) |
| GET    | `/api/invoice/:id` | Get invoice by ID |
| PUT    | `/api/invoice/:id` | Update an invoice |
| POST   | `/api/invoice` | Create a new invoice |
| DELETE | `/api/invoice/:id` | Delete an invoice |

### Permissions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/permissions` | Get all permissions |
| PUT    | `/api/permission/:id` | Update a permission |
| POST   | `/api/permission` | Create a new permission |
| DELETE | `/api/permission/:id` | Delete a permission |

### Roles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/roles/:userId` | Get roles for a specific user |
| PUT    | `/api/roles/:id` | Update a role |
| POST   | `/api/roles` | Create a new role |
| DELETE | `/api/roles/:id` | Delete a role |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/users` | Get all users |
| PATCH  | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

## Installation

1. Clone the repository:
     ```sh
     git clone https://github.com/sam-sepiol1/cogip-api.git
     ```
2. Navigate to the project directory:
     ```sh
     cd cogip-api
     ```
3. Install dependencies:
     ```sh
     npm install
     ```
4. Start the server:
     ```sh
     npm start
     ```
5. Run the front end: 
   You can find the front end at [https://github.com/sam-sepiol1/cogip-client]


## Credits 

This app was designed by a team of 4 developers:
- [Sebastien S.](https://github.com/sam-sepiol1) : Front End Developer
- [Cristelle H](https://github.com/KikiMaouw) : Front End Developer        
- [Stephen Chevalier](https://github.com/Neogiciaa) : Back End Developer and Project Manager          
- [Mohamed B.](https://github.com/Mominho11) : Back End Developer
