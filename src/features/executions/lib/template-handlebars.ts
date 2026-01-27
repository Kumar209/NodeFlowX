// src/lib/template-handlebars.ts
import Handlebars from "handlebars";

// Register json helper with proper formatting
Handlebars.registerHelper("json", function(context: any) {
    const jsonString = JSON.stringify(context, null, 2);
    return new Handlebars.SafeString(jsonString);
});

// Register get helper for bracket-like syntax
Handlebars.registerHelper("get", function(obj: any, property: string) {
    if (!obj) return undefined;
    
    // Try direct access
    if (obj[property] !== undefined) {
        return obj[property];
    }
    
    // Try case-insensitive search
    if (typeof obj === 'object') {
        const normalizedProperty = property.toLowerCase().replace(/[^a-z0-9]/g, '');
        for (const key of Object.keys(obj)) {
            const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (normalizedKey === normalizedProperty) {
                return obj[key];
            }
        }
    }
    
    return undefined;
});

// Register bracket notation helper
Handlebars.registerHelper("bracket", function(obj: any, property: string) {
    if (!obj) return undefined;
    
    // Remove quotes if present
    const cleanKey = property.replace(/^['"]|['"]$/g, '');
    
    // Try direct access
    if (obj[cleanKey] !== undefined) {
        return obj[cleanKey];
    }
    
    // Try case-insensitive search
    if (typeof obj === 'object') {
        const normalizedKey = cleanKey.toLowerCase().replace(/[^a-z0-9]/g, '');
        for (const actualKey of Object.keys(obj)) {
            const normalizedActualKey = actualKey.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (normalizedActualKey === normalizedKey) {
                return obj[actualKey];
            }
        }
    }
    
    return undefined;
});

// Create a custom compile function that preprocesses bracket notation
function preprocessTemplate(template: string): string {
    // Convert {{object.['key']}} to {{bracket object 'key'}}
    return template.replace(
        /\{\{([^}]+?)\.\[(['"][^'"]+['"])\](\.[^}]*)?\}\}/g,
        (match, obj, key, rest = '') => {
            const restPart = rest ? rest.slice(1) : ''; // Remove leading dot
            if (restPart) {
                return `{{bracket ${obj} ${key}${restPart}}}`;
            }
            return `{{bracket ${obj} ${key}}}`;
        }
    );
}

export function compileTemplate(template: string, context: any): string {
    try {
        // Handle empty template
        if (!template || template.trim() === '') {
            return '';
        }
        
        // Preprocess the template to handle bracket notation
        const processedTemplate = preprocessTemplate(template);
        
        const compiled = Handlebars.compile(processedTemplate, {
            noEscape: true, // Don't escape HTML
            strict: false, // Don't throw on missing properties
        });
        
        return compiled(context);
    } catch (error) {
        console.error('Template compilation error:', error);
        return template;
    }
}