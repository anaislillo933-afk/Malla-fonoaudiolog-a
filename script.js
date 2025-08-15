const materias = document.querySelectorAll('.materia');

function checkUnlock() {
    materias.forEach(m => {
        const prereqs = m.dataset.prereq.split(';').filter(p => p);
        const unlocked = prereqs.every(p => {
            const prereqMateria = [...materias].find(x => x.dataset.name === p);
            return prereqMateria && prereqMateria.classList.contains('approved');
        });
        if (unlocked) {
            m.classList.remove('locked');
        } else if (prereqs.length > 0) {
            m.classList.add('locked');
            m.classList.remove('approved'); // evitar que quede aprobado si se cambian prerrequisitos
        }
    });
}

// Inicialmente bloquear materias con prerrequisitos
materias.forEach(m => {
    if (m.dataset.prereq) {
        m.classList.add('locked');
    }
});

// Click en materia
materias.forEach(m => {
    m.addEventListener('click', () => {
        if (m.classList.contains('locked')) return;
        m.classList.toggle('approved');
        checkUnlock(); // actualizar desbloqueos
    });
});

// Ejecutar al cargar
checkUnlock();
