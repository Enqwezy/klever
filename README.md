# klever

# Триггер для G4f
CREATE OR REPLACE FUNCTION update_service_search_vector() RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('russian', COALESCE(NEW.name, '') || ' ' || COALESCE(NEW.description, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_service_search_vector
BEFORE INSERT OR UPDATE OF name, description
ON services
FOR EACH ROW
EXECUTE FUNCTION update_service_search_vector();

UPDATE services
SET search_vector = to_tsvector('russian', COALESCE(name, '') || ' ' || COALESCE(description, ''));

# Триггер для Ресторанов
CREATE OR REPLACE FUNCTION update_restaurant_search_vector() RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('russian', COALESCE(NEW.name, '') || ' ' || COALESCE(NEW.description, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_restaurant_search_vector
BEFORE INSERT OR UPDATE OF name, description
ON restaurants
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_search_vector();

UPDATE restaurants
SET search_vector = to_tsvector('russian', COALESCE(name, '') || ' ' || COALESCE(description, ''));