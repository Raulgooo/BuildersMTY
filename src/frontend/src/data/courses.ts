export interface CourseModule {
  title: string;
  desc: string;
}

export interface Course {
  id: string;
  icon: string;
  title: string;
  difficulty: "INTERMEDIO" | "AVANZADO";
  desc: string;
  longDesc: string;
  learns: string[];
  modules: CourseModule[];
  available: boolean;
}

export const courses: Course[] = [
  {
    id: "memory-allocator-c",
    icon: "memory",
    title: "Crea tu Propio Alocador de Memoria en C",
    difficulty: "AVANZADO",
    desc: "Construye un memory allocator desde cero. Entiende como funciona malloc, free y la gestion de memoria a nivel de sistema operativo.",
    longDesc: "En este curso construiras un memory allocator funcional desde cero en C. Empezaras entendiendo como el sistema operativo gestiona la memoria virtual, luego implementaras tu propia version de malloc y free usando listas libres. Aprenderas sobre fragmentacion, coalescing, alineamiento de memoria y como debuggear problemas de memoria con herramientas profesionales.",
    learns: [
      "Gestion de memoria virtual y paginas",
      "Implementacion de malloc/free con listas libres",
      "Fragmentacion, coalescing y alineamiento",
      "Debugging con Valgrind y AddressSanitizer",
    ],
    modules: [
      { title: "Memoria Virtual y el OS", desc: "Como el sistema operativo gestiona la memoria y que es el heap" },
      { title: "sbrk y mmap", desc: "Syscalls para pedir memoria al kernel" },
      { title: "Primera version de malloc", desc: "Implementacion naive con lista enlazada" },
      { title: "free y Coalescing", desc: "Liberar bloques y fusionar bloques adyacentes" },
      { title: "Splitting y Best Fit", desc: "Estrategias de asignacion para reducir fragmentacion" },
      { title: "Alineamiento de Memoria", desc: "Alinear bloques a boundaries de 8/16 bytes" },
      { title: "Thread Safety", desc: "Locks y arenas para soporte multi-hilo" },
      { title: "Testing y Debugging", desc: "Valgrind, ASan y benchmarks contra glibc malloc" },
    ],
    available: true,
  },
  {
    id: "http-server-go",
    icon: "dns",
    title: "Crea tu Servidor HTTP con Go",
    difficulty: "INTERMEDIO",
    desc: "Implementa un servidor HTTP desde el socket TCP hasta el routing. Sin frameworks, sin magia — solo Go y la standard library.",
    longDesc: "Construye un servidor HTTP completo sin usar frameworks. Empezaras abriendo un socket TCP raw, parseando requests HTTP/1.1 a mano, y construyendo responses. Luego agregaras goroutines para manejar conexiones concurrentes, implementaras un router con pattern matching, y terminaras con middleware y servicio de archivos estaticos.",
    learns: [
      "Sockets TCP y el protocolo HTTP/1.1",
      "Goroutines y concurrencia para conexiones simultaneas",
      "Parsing de requests y construccion de responses",
      "Middleware, routing y manejo de archivos estaticos",
    ],
    modules: [
      { title: "TCP desde Cero", desc: "Abrir un socket, aceptar conexiones y leer bytes" },
      { title: "Parseando HTTP/1.1", desc: "Request line, headers y body segun el RFC" },
      { title: "Construyendo Responses", desc: "Status codes, headers y content-type" },
      { title: "Concurrencia con Goroutines", desc: "Una goroutine por conexion y manejo de errores" },
      { title: "Router y Pattern Matching", desc: "Multiplexor de rutas con parametros dinamicos" },
      { title: "Middleware y Archivos Estaticos", desc: "Logging, CORS y servir archivos del disco" },
    ],
    available: true,
  },
  {
    id: "claude-code-agent",
    icon: "smart_toy",
    title: "Crea tu Propio Claude Code",
    difficulty: "AVANZADO",
    desc: "Construye un agente de codigo con IA que lee, edita y ejecuta en tu terminal. Aprende como funcionan los coding agents por dentro.",
    longDesc: "Construye un coding agent desde cero que puede leer archivos, editarlos, ejecutar comandos y mantener contexto. Aprenderas la arquitectura de agentes con tool-use loops, como integrar APIs de LLMs, sandboxing de ejecucion, y manejo de contexto para conversaciones largas.",
    learns: [
      "Arquitectura de agentes con tool-use y loops",
      "Integracion con APIs de LLMs (Claude, OpenAI)",
      "Sandboxing y ejecucion segura de comandos",
      "Context management y streaming de respuestas",
    ],
    modules: [
      { title: "Arquitectura de un Agent", desc: "El loop de tool-use: prompt, call, observe, repeat" },
      { title: "Conectando con LLMs", desc: "API de Claude y OpenAI con streaming" },
      { title: "Tool Definitions", desc: "Definir herramientas: read, write, bash, grep" },
      { title: "File Operations", desc: "Leer, escribir y editar archivos de forma segura" },
      { title: "Ejecucion de Comandos", desc: "Sandboxing, timeouts y captura de output" },
      { title: "Context Management", desc: "Sliding window, summarization y token counting" },
      { title: "Streaming y UX", desc: "Output en tiempo real y indicadores de progreso" },
      { title: "Conversation Memory", desc: "Persistencia de contexto entre sesiones" },
      { title: "Error Recovery", desc: "Reintentos, fallbacks y manejo de errores del LLM" },
      { title: "Poniendolo Todo Junto", desc: "CLI completa con configuracion y extensiones" },
    ],
    available: false,
  },
  {
    id: "shell-rust",
    icon: "terminal",
    title: "Shell desde Cero en Rust",
    difficulty: "AVANZADO",
    desc: "Implementa un shell UNIX completo con pipes, redireccion, job control y built-in commands. Entiende como funciona bash por dentro.",
    longDesc: "Construye tu propio shell interactivo en Rust. Desde el prompt hasta pipes complejos, redireccion de archivos, variables de entorno y job control. Entenderas como bash ejecuta comandos, maneja procesos hijo y controla el terminal.",
    learns: [
      "Parsing de comandos y tokenizacion",
      "Fork, exec y manejo de procesos",
      "Pipes, redireccion y file descriptors",
      "Job control y senales UNIX",
    ],
    modules: [
      { title: "REPL y Tokenizacion", desc: "Leer input, tokenizar y parsear comandos" },
      { title: "Fork y Exec", desc: "Crear procesos hijo y ejecutar binarios" },
      { title: "Built-in Commands", desc: "cd, exit, export y echo sin fork" },
      { title: "Pipes", desc: "Conectar stdout de un proceso con stdin de otro" },
      { title: "Redireccion", desc: ">, >>, < y file descriptors" },
      { title: "Variables de Entorno", desc: "PATH lookup, expansion y exportacion" },
      { title: "Job Control", desc: "Ctrl+C, Ctrl+Z, bg, fg y senales" },
    ],
    available: false,
  },
  {
    id: "kv-database",
    icon: "database",
    title: "Base de Datos Key-Value",
    difficulty: "INTERMEDIO",
    desc: "Construye un motor de almacenamiento persistente con B-trees, WAL y compactacion. Entiende como funcionan las bases de datos por dentro.",
    longDesc: "Implementa una base de datos key-value desde cero. Empezaras con almacenamiento en memoria, luego agregaras persistencia con un Write-Ahead Log, implementaras B-trees para indexacion eficiente, y terminaras con un protocolo de red para que clientes se conecten remotamente.",
    learns: [
      "Estructuras de datos en disco: B-trees y LSM",
      "Write-Ahead Log para durabilidad",
      "Compactacion y garbage collection",
      "Protocolo de red y cliente CLI",
    ],
    modules: [
      { title: "Storage Engine In-Memory", desc: "HashMap con operaciones GET, SET, DELETE" },
      { title: "Persistencia con WAL", desc: "Write-Ahead Log para sobrevivir crashes" },
      { title: "Serializacion Binaria", desc: "Encoding eficiente de keys y values" },
      { title: "B-Tree Index", desc: "Indexacion en disco con B-trees balanceados" },
      { title: "Compactacion", desc: "Garbage collection y reclamacion de espacio" },
      { title: "Transacciones Basicas", desc: "Atomicidad con batch writes" },
      { title: "Protocolo TCP", desc: "Servidor de red y cliente CLI" },
      { title: "Benchmarks", desc: "Comparacion de rendimiento con Redis y LevelDB" },
    ],
    available: false,
  },
  {
    id: "auth-service-go",
    icon: "lock",
    title: "Auth Service con Go",
    difficulty: "INTERMEDIO",
    desc: "Implementa un servicio de autenticacion completo con JWT, OAuth, MFA y sesiones seguras. De cero a produccion.",
    longDesc: "Construye un servicio de autenticacion production-ready desde cero. Implementaras registro, login, sesiones con cookies HttpOnly, tokens JWT, integracion OAuth2, MFA con TOTP, y protecciones contra ataques comunes. El mismo tipo de servicio que usan apps reales en produccion.",
    learns: [
      "JWT tokens y sesiones con cookies HttpOnly",
      "Flujos OAuth2 con providers externos",
      "TOTP MFA y codigos de recuperacion",
      "Rate limiting y proteccion contra ataques",
    ],
    modules: [
      { title: "Registro y Login", desc: "Hashing de passwords con bcrypt y validacion" },
      { title: "Sesiones con Cookies", desc: "HttpOnly, Secure, SameSite y expiracion" },
      { title: "JWT Tokens", desc: "Signing, verification y refresh tokens" },
      { title: "OAuth2 Integration", desc: "Flujo authorization code con GitHub y Google" },
      { title: "MFA con TOTP", desc: "Generar secretos, QR codes y verificar codigos" },
      { title: "Recovery Codes", desc: "Generacion, almacenamiento y uso unico" },
      { title: "Rate Limiting", desc: "Proteccion contra brute force y enumeracion" },
      { title: "Password Reset", desc: "Flujo seguro con tokens temporales y email" },
      { title: "Deploy a Produccion", desc: "Docker, HTTPS, CORS y configuracion segura" },
    ],
    available: false,
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.id === slug);
}
