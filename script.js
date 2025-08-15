const materias = document.querySelectorAll('.materia');

materias.forEach(m => {
    if (m.dataset.prereq) m.classList.add('locked');
});

function updateUnlocks() {
    materias.forEach(m => {
        const prereqs = m.dataset.prereq.split(';').filter(p => p);
        const canUnlock = prereqs.every(pr => {
            const prereqMateria = [...materias].find(x => x.dataset.name === pr);
            return prereqMateria && prereqMateria.classList.contains('approved');
        });
        if (canUnlock) {
            m.classList.remove('locked');
        } else if (prereqs.length > 0) {
            m.classList.add('locked');
            m.classList.remove('approved');
        }
    });
}

materias.forEach(m => {
    m.addEventListener('click', () => {
        if (m.classList.contains('locked')) return;
        m.classList.toggle('approved');
        updateUnlocks();
    });
});

updateUnlocks();
