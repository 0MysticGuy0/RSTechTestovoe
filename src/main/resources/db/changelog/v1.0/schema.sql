DROP TABLE IF EXISTS categories;

CREATE TABLE IF NOT EXISTS categories
(
    id bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    description VARCHAR(255),
    name VARCHAR
);

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products
(
    id bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    creation_date timestamp(6) without time zone,
    description VARCHAR(255),
    image_path VARCHAR,
    name VARCHAR,
    price double precision,
    status VARCHAR,
    category_id bigint,
    CONSTRAINT product_category_fk FOREIGN KEY (category_id)
        REFERENCES categories (id),
    CONSTRAINT products_status_check CHECK (status::text = ANY (ARRAY['ACTIVE'::character varying, 'NON_ACTIVE'::character varying]::text[]))
);