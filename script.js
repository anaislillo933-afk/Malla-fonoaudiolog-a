const materias = document.querySelectorAll('.materia');

// Inicialmente bloqueamos materias con prerrequisitos
materias.forEach(m => {
    if (m.dataset.abre) {
        const prereq = [...materias].find(x => x.dataset.abre?.includes(m.dataset.name));
        if (prereq) {
            m.classList.add('locked');
        }
    }
});

materias.forEach(m => {
    m.addEventListener('click', () => {
        if (m.classList.contains('locked')) return;

        // Marcar como aprobado
        m.classList.toggle('approved');

        // Desbloquear materias que dependen de esta
        materias.forEach(target => {
            if (target.dataset.abre && target.dataset.abre.includes(m.dataset.name)) {
                target.classList.remove('locked');
            }
        });
    });
});
