document.addEventListener('DOMContentLoaded', function () {
    const publicationsContainer = document.getElementById('publications-list');

    if (publicationsContainer) {
        fetch('assets/data/publications.json')
            .then(response => response.json())
            .then(data => {
                const list = document.createElement('ul');

                data.forEach(pub => {
                    const item = document.createElement('li');

                    // Format authors: bold specific name
                    const authors = pub.authors.map(author => {
                        if (author === 'Breno Dantas Cruz') {
                            return `<span class="bolded">${author}</span>`;
                        }
                        return author;
                    }).join(', ');

                    // Build the HTML
                    let html = `${authors} <a href="${pub.link}">${pub.title}</a>.`;

                    if (pub.venue) {
                        html += ` (${pub.status ? pub.status + ' ' : ''}<span>${pub.venue}</span>)`;
                    } else if (pub.status) {
                        html += ` (${pub.status})`;
                    }

                    item.innerHTML = html;
                    list.appendChild(item);
                });

                publicationsContainer.appendChild(list);
            })
            .catch(error => console.error('Error loading publications:', error));
    }
});
